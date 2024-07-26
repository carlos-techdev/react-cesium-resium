import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Viewer,
  Entity,
  BillboardGraphics,
  Scene,
  RectangleGraphics,
} from "resium";
import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartesian2,
  defined,
  Rectangle,
  Color,
  Cartographic,
} from "cesium";
import FloatingButtons from "./FloatingButtons";
import Drawer from "./drawer";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../redux/actions/map";

const contextOptions = { webgl: { preserveDrawingBuffer: true } };

const Cesium = () => {
  const dispatch = useDispatch();
  const [clickPosition, setClickPosition] = useState(null);
  const startPosition = useRef(null);
  const endPosition = useRef(null);
  const [startCanvasPos, setStartCanvasPos] = useState({});
  const [endCanvasPos, setEndCanvasPos] = useState({});
  const [symbols, setSymbols] = useState([]);
  const [symbol, setSymbol] = useState(null);
  const [layer, setLayer] = useState(0);
  const [layers, setLayers] = useState([]);
  const [isSelectedArea, setIsSelectedArea] = useState(false);
  const [selectedRectangle, setSelectedRectangle] = useState(undefined);
  const [symbolPosition, setSymbolPosition] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [moveUpLayer, setMoveUpLayer] = useState(null);
  const [moveDownLayer, setMoveDownLayer] = useState(null);
  const viewerRef = useRef(null);

  const changeSymbols = useCallback(
    (datas) => {
      if (datas.length > 0) {
        setSymbols((prevSymbols) => {
          if (!prevSymbols[layer]) {
            prevSymbols.push([]);
          }
          let newSymbols = [...prevSymbols];
          newSymbols[layer - 1] = [
            ...prevSymbols[layer - 1],
            { ...datas[datas.length - 1], id: layer - 1 },
          ];
          return newSymbols;
        });
      }
      setClickCount(0);
      setCount(0);
    },
    [layer, symbols[layer - 1]?.length]
  );

  const changeSymbol = useCallback((data) => {
    setSymbol(data);
  }, []);

  const changeLayer = useCallback(
    (data) => {
      setLayer(data);
      dispatch(closeDrawer());
    },
    [dispatch]
  );

  const changeLayers = useCallback((data) => {
    setLayers(data);
    // console.log(data);
  }, []);

  const changeMoveUpLayer = useCallback((data) => {
    setMoveUpLayer(data);
  }, []);

  const changeMoveDownLayer = useCallback((data) => {
    setMoveDownLayer(data);
  }, []);

  const deleteSymbolsByLayer = useCallback((data) => {
    // console.log(data);
    setSymbols((prevSymbols) => {
      let newSymbols = prevSymbols.filter(
        (layerSymbols) => layerSymbols[0]?.id !== data
      );
      // console.log(newSymbols);
      return newSymbols;
    });
  }, []);

  const selectExportArea = useCallback(
    (data) => {
      setIsSelectedArea(data);
      dispatch(closeDrawer());
    },
    [dispatch]
  );

  useEffect(() => {
    if (moveUpLayer !== null) {
      setSymbols((prevSymbols) => {
        let newSymbols = [...prevSymbols];
        let temp = newSymbols[moveUpLayer];
        newSymbols[moveUpLayer] = newSymbols[moveUpLayer - 1];
        newSymbols[moveUpLayer - 1] = temp;
        return newSymbols;
      });
    }
  }, [moveUpLayer]);

  useEffect(() => {
    if (moveDownLayer !== null) {
      setSymbols((prevSymbols) => {
        let newSymbols = [...prevSymbols];
        let temp = newSymbols[moveDownLayer];
        newSymbols[moveDownLayer] = newSymbols[moveDownLayer + 1];
        newSymbols[moveDownLayer + 1] = temp;
        return newSymbols;
      });
    }
  }, [moveDownLayer]);

  useEffect(() => {
    if (symbols[layer - 1]?.length > 0 && clickPosition) {
      setSymbols((prevSymbols) => {
        let newSymbols = [...prevSymbols];
        newSymbols[layer - 1][newSymbols[layer - 1].length - 1].position =
          clickPosition;
        return newSymbols;
      });
    }
  }, [clickPosition, layer]);

  useEffect(() => {
    const handler = new ScreenSpaceEventHandler(
      viewerRef.current?.cesiumElement?.scene?.canvas
    );

    handler.setInputAction((movement) => {
      if (!isSelectedArea && symbol) {
        setCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount === 1) {
            setClickCount(1);
            setSymbolPosition({ x: 0, y: 0 });
            const cartesian =
              viewerRef.current?.cesiumElement?.camera?.pickEllipsoid(
                new Cartesian2(movement.position?.x, movement.position?.y),
                viewerRef.current?.cesiumElement?.scene?.globe?.ellipsoid
              );
            if (defined(cartesian)) {
              setClickPosition(cartesian);
            }
          }
          return newCount;
        });
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    if (viewerRef.current && viewerRef.current.cesiumElement) {
      viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableRotate =
        !isSelectedArea;
      viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableZoom =
        !isSelectedArea;
      viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableTranslate =
        !isSelectedArea;
      viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableTilt =
        !isSelectedArea;
    }

    return () => {
      handler.destroy();
    };
  }, [isSelectedArea, symbol]);

  useEffect(() => {
    const handler = new ScreenSpaceEventHandler(
      viewerRef.current?.cesiumElement?.scene?.canvas
    );

    const handleMouseDown = (movement) => {
      const start_position =
        viewerRef.current?.cesiumElement?.camera?.pickEllipsoid(
          new Cartesian2(movement.position.x, movement.position.y),
          viewerRef.current?.cesiumElement?.scene?.globe?.ellipsoid
        );
      if (defined(start_position)) {
        setStartCanvasPos(movement.position);
        startPosition.current = Cartographic.fromCartesian(start_position);
      }
    };

    const handleMouseMove = (movement) => {
      if (!isSelectedArea && clickCount === 0) {
        const { endPosition } = movement;
        setSymbolPosition({ x: endPosition.x, y: endPosition.y });
      }
      if (defined(startPosition.current)) {
        const end_position =
          viewerRef.current?.cesiumElement?.camera?.pickEllipsoid(
            new Cartesian2(movement.endPosition.x, movement.endPosition.y),
            viewerRef.current?.cesiumElement?.scene?.globe?.ellipsoid
          );
        if (defined(end_position)) {
          const endCartographic = Cartographic.fromCartesian(end_position);
          endPosition.current = endCartographic;
          const west = Math.min(
            startPosition.current.longitude,
            endCartographic.longitude
          );
          const east = Math.max(
            startPosition.current.longitude,
            endCartographic.longitude
          );
          const south = Math.min(
            startPosition.current.latitude,
            endCartographic.latitude
          );
          const north = Math.max(
            startPosition.current.latitude,
            endCartographic.latitude
          );
          if (west && east && south && north) {
            setSelectedRectangle(new Rectangle(west, south, east, north));
          }
        }
      }
    };

    const handleMouseUp = (movement) => {
      if (defined(startPosition)) {
        setEndCanvasPos(movement.position);
        startPosition.current = null;
        endPosition.current = null;
      }
    };

    if (isSelectedArea) {
      // Set the MOUSE_DOWN, MOUSE_MOVE, and LEFT_UP handlers
      handler.setInputAction(handleMouseDown, ScreenSpaceEventType.LEFT_DOWN);
      handler.setInputAction(handleMouseUp, ScreenSpaceEventType.LEFT_UP);
    }
    handler.setInputAction(handleMouseMove, ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      // Cleanup: Destroy handler when component unmounts
      handler.removeInputAction(ScreenSpaceEventType.LEFT_DOWN);
      handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
      handler.removeInputAction(ScreenSpaceEventType.LEFT_UP);
      handler.destroy();
    };
  }, [isSelectedArea, symbol, clickPosition, clickCount]);

  return (
    <>
      <FloatingButtons />
      <Drawer
        layer={layer}
        sendLayer={changeLayer}
        sendLayers={changeLayers}
        sendSymbols={changeSymbols}
        sendSymbol={changeSymbol}
        sendDeletedLayer={deleteSymbolsByLayer}
        sendMoveUpLayer={changeMoveUpLayer}
        sendMoveDownLayer={changeMoveDownLayer}
        sendExportArea={selectExportArea}
        viewerRef={viewerRef}
        selectedRectangle={selectedRectangle}
        setSelectedRectangle={setSelectedRectangle}
        startCanvasPos={startCanvasPos}
        endCanvasPos={endCanvasPos}
        symbols={symbols}
      />
      <Viewer
        full
        ref={viewerRef}
        id="cesium_viewer"
        timeline={false}
        animation={false}
        contextOptions={contextOptions}
      >
        <Scene>
          {layers
            ?.filter((layer) => layer.visible === true)
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((layer, key) =>
              symbols
                .filter((labelSymbols) => labelSymbols[0]?.id === layer.id)[0]
                ?.map((symbol, key) => (
                  <Entity key={key} position={symbol.position}>
                    <BillboardGraphics
                      image={symbol.label ? symbol.label : null}
                    />
                  </Entity>
                ))
            )}

          <Entity>
            {selectedRectangle ? (
              <RectangleGraphics
                coordinates={selectedRectangle}
                fill={false}
                outline={true}
                outlineColor={Color.RED}
              />
            ) : null}
          </Entity>
        </Scene>
      </Viewer>
      {symbol &&
        (symbolPosition.x > 0 || symbolPosition.y) &&
        clickCount === 0 && (
          <img
            src={symbol}
            alt="hovered"
            style={{
              position: "absolute",
              top: symbolPosition.y,
              left: symbolPosition.x,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none", // Prevent image from interfering with mouse events
            }}
          />
        )}
    </>
  );
};

export default Cesium;
