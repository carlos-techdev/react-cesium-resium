import { useState, useEffect } from "react";
import { Stage } from "react-konva";
import LayerComponent from "./LayerComponent";
import { Button } from "antd";
import {
  UpOutlined,
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const MultiLayerCanvas = ({
  sendLayer,
  sendLayers,
  symbols,
  sendDeletedLayer,
  sendMoveUpLayer,
  sendMoveDownLayer,
}) => {
  const [layers, setLayers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentLayerIndex, setCurrentLayerIndex] = useState(null);

  useEffect(() => {
    sendLayers(layers);
  }, [layers]);

  const addLayer = () => {
    if (layers.length > 0 && (!symbols[layers.length - 1] || symbols[layers.length - 1]?.length === 0)) {
      alert("you have to add at least 1 symbol.");
    } else {
      setLayers([
        ...layers,
        {
          id: layers.length,
          shapes: [],
          visible: true,
          opacity: 1,
          name: "Layer" + (layers.length + 1),
          zIndex: layers.length,
        },
      ]);
      setCurrentLayerIndex(layers.length);
      sendLayer(layers.length + 1);
    }
  };

  // const addShape = (type) => {
  //   if (currentLayerIndex === null) return;

  //   const newShape = {
  //     id: Date.now(),
  //     type,
  //     x: 50,
  //     y: 50,
  //     width: 50,
  //     height: 50,
  //     radius: 25,
  //     points: [0, 0, 50, 50],
  //     fill: 'red',
  //     draggable: true,
  //   };

  //   const newLayers = layers.map((layer, index) => {
  //     if (index === currentLayerIndex) {
  //       return { ...layer, shapes: [...layer.shapes, newShape] };
  //     }
  //     return layer;
  //   });
  //   setLayers(newLayers);
  // };

  const updateShapes = (shapes) => {
    const newLayers = layers.map((layer, index) => {
      if (index === currentLayerIndex) {
        return { ...layer, shapes };
      }
      return layer;
    });
    setLayers(newLayers);
  };

  const selectLayer = (index) => {
    setCurrentLayerIndex(index);
  };

  const toggleLayerVisibility = (index) => {
    const newLayers = layers.map((layer, i) => {
      if (i === index) {
        return { ...layer, visible: !layer.visible };
      }
      return layer;
    });
    setLayers(newLayers);
  };

  const deleteLayer = (id) => {
    setLayers((prevLayers) => {
      let newLayers = prevLayers.filter(layer=>layer.id !== id);
      return newLayers;
    });
    sendDeletedLayer(id);
  };

  const changeLayerOpacity = (index, opacity) => {
    const newLayers = layers.map((layer, i) => {
      if (i === index) {
        return { ...layer, opacity };
      }
      return layer;
    });
    setLayers(newLayers);
  };

  const moveToUp = (index) => {
    setLayers((prevLayers) => {
      let newLayers = [...prevLayers];
      let temp = newLayers[index];
      newLayers[index] = newLayers[index - 1];
      newLayers[index - 1] = temp;
      return newLayers;
    });
    sendMoveUpLayer(index);
  };

  const moveToDown = (index) => {
    setLayers((prevLayers) => {
      let newLayers = [...prevLayers];
      let temp = newLayers[index];
      newLayers[index] = newLayers[index + 1];
      newLayers[index + 1] = temp;
      return newLayers;
    });
    sendMoveDownLayer(index);
  };

  // const moveLayer = (fromIndex, toIndex) => {
  //   const updatedLayers = [...layers];
  //   const [movedLayer] = updatedLayers.splice(fromIndex, 1);
  //   updatedLayers.splice(toIndex, 0, movedLayer);
  //   setLayers(updatedLayers);
  // };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="layer-list">
        {layers.map((layer, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <div
              onClick={() => selectLayer(index)}
              style={{
                cursor: "pointer",
                padding: "5px",
                backgroundColor: layer.visible ? "lightgrey" : "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{layer.name}</span>
              <Button
                onClick={() => moveToUp(index)}
                disabled={index === 0 ? true : false}
              >
                <UpOutlined />
              </Button>
              <Button
                onClick={() => moveToDown(index)}
                disabled={index === layers.length - 1 ? true : false}
              >
                <DownOutlined />
              </Button>
              <Button onClick={() => toggleLayerVisibility(index)}>
                {layer.visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </Button>
              <Button onClick={() => deleteLayer(layers[index]?.id)}>
                <DeleteOutlined />
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={layer.opacity}
                onChange={(e) =>
                  changeLayerOpacity(index, parseFloat(e.target.value))
                }
              />
            </div>
          </div>
        ))}
      </div>
      {layers.map((layer, index) => (
        <div key={index}>
          <Stage width={800}>
            <LayerComponent
              shapes={layer.shapes}
              onShapesChange={updateShapes}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              opacity={layer.opacity}
              visible={layer.visible}
              name={layer.name}
            />
          </Stage>
        </div>
      ))}

      <Button onClick={addLayer} type="primary">
        Add Layer
      </Button>
    </div>
  );
};

export default MultiLayerCanvas;
