import Layer from "./Layer";
import Print from "./Print";
import Option from "./Option";
import AddSymbol from "./AddSymbol";
import EditSymbol from "./EditSymbol";
import EditSymbolCoordinates from "./EditSymbolCoordinates";

const Drawer = (props) => {
  return (
    <>
      <Layer
        sendLayer={props.sendLayer}
        sendLayers={props.sendLayers}
        symbols={props.symbols}
        sendDeletedLayer={props.sendDeletedLayer}
        sendMoveUpLayer={props.sendMoveUpLayer}
        sendMoveDownLayer={props.sendMoveDownLayer}
      />
      <Print {...props} />
      <Option />
      <AddSymbol {...props} />
      <EditSymbol />
      <EditSymbolCoordinates />
    </>
  );
};

export default Drawer;
