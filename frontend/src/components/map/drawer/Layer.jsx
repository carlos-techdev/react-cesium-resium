import { Drawer, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../../redux/actions/map";
import MultiLayerCanvas from "./MultiLayerCanvas";
import "./LayerStyles.css";

const Layer = ({ sendLayer, sendLayers, symbols, sendDeletedLayer, sendMoveUpLayer, sendMoveDownLayer }) => {
  const dispatch = useDispatch();
  const openedDrawer = useSelector((state) => state.map.drawer);

  const tabItems = [
    {
      key: "1",
      label: "Layer Viewer",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Layer Manager",
      children: (
        <MultiLayerCanvas
          sendLayer={sendLayer}
          symbols={symbols}
          sendLayers={sendLayers}
          sendDeletedLayer={sendDeletedLayer}
          sendMoveUpLayer={sendMoveUpLayer}
          sendMoveDownLayer={sendMoveDownLayer}
        />
      ),
    },
  ];

  const onClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      title="Layer"
      placement={"left"}
      closable={false}
      onClose={onClose}
      open={openedDrawer === "layer"}
      width={500}
    >
      <Tabs defaultActiveKey="1" items={tabItems} />
    </Drawer>
  );
};

export default Layer;
