import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../../redux/actions/map";

const EditSymbolCoordinates = () => {
  const dispatch = useDispatch();
  const openedDrawer = useSelector((state) => state.map.drawer);
  const onClose = () => {
    dispatch(closeDrawer());
  };
  return (
    <Drawer
      title="EditSymbolCoordinates"
      placement={"right"}
      closable={false}
      onClose={onClose}
      open={openedDrawer === "editSymbolCoordinates"}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default EditSymbolCoordinates;
