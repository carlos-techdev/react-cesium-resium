import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../../redux/actions/map";

const EditSymbol = () => {
  const dispatch = useDispatch();
  const openedDrawer = useSelector((state) => state.map.drawer);
  const onClose = () => {
    dispatch(closeDrawer());
  };
  return (
    <Drawer
      title="EditSymbol"
      placement={"right"}
      closable={false}
      onClose={onClose}
      open={openedDrawer === "editSymbol"}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default EditSymbol;
