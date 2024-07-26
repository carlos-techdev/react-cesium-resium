import {
  PicCenterOutlined,
  PrinterOutlined,
  ControlOutlined,
  PlusOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../redux/actions/map";

const FloatingButtons = () => {
  const dispatch = useDispatch();
  const onOpenDrawer = (drawer) => {
    dispatch(openDrawer(drawer));
  };
  return (
    <>
      <div>
        <FloatButton
          icon={<PicCenterOutlined />}
          type="primary"
          style={{
            left: 12,
            top: 18,
          }}
          onClick={() => onOpenDrawer("layer")}
        />
        <FloatButton
          icon={<PrinterOutlined />}
          type="primary"
          style={{
            left: 12,
            top: 78,
          }}
          onClick={() => onOpenDrawer("print")}
        />
        <FloatButton
          icon={<ControlOutlined />}
          type="primary"
          style={{
            left: 12,
            top: 138,
          }}
          onClick={() => onOpenDrawer("option")}
        />
      </div>

      <div>
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{
            right: 12,
            top: 58,
          }}
          onClick={() => onOpenDrawer("addSymbol")}
        />
        <FloatButton
          icon={<EditOutlined />}
          type="primary"
          style={{
            right: 12,
            top: 118,
          }}
          onClick={() => onOpenDrawer("editSymbol")}
        />
        <FloatButton
          icon={<UnorderedListOutlined />}
          type="primary"
          style={{
            right: 12,
            top: 178,
          }}
          onClick={() => onOpenDrawer("editSymbolCoordinates")}
        />
      </div>
    </>
  );
};

export default FloatingButtons;
