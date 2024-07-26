import { useEffect, useState } from "react";
import {
  Drawer,
  Collapse,
  Button,
  Form,
  Checkbox,
  Input,
  Select,
  Switch,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../../redux/actions/map";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Print({
  sendExportArea,
  selectedRectangle,
  setSelectedRectangle,
  startCanvasPos,
  endCanvasPos,
}) {
  const [isSelectedArea, setIsSelectedArea] = useState(false);

  const selectArea = () => {
    setIsSelectedArea(!isSelectedArea);
    sendExportArea(!isSelectedArea);
  };

  let backgroundColor = isSelectedArea ? "rgb(50, 50, 255)" : "white";
  let textColor = isSelectedArea ? "white" : "black";

  const items = [
    {
      key: "1",
      label: "Export Area",
      children: (
        <Form wrapperCol={{ style: { textAlign: "right" } }}>
          <Form.Item>
            <Button
              block
              onClick={selectArea}
              style={{ backgroundColor: backgroundColor, color: textColor }}
            >
              Select new Export Area
            </Button>
          </Form.Item>
          <Form.Item
            label="Set export area to fit page size"
            name=""
            valuePropName=""
          >
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item label="Top-left corner" name="" valuePropName="">
            <Input style={{ width: "160px" }} />
          </Form.Item>
          <Form.Item label="Bottom-right corner" name="" valuePropName="">
            <Input style={{ width: "160px" }} />
          </Form.Item>
          <Form.Item label="Scale" name="" valuePropName="">
            <Select
              value=""
              style={{ width: "160px" }}
              options={[{ value: "123", label: "123" }]}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Output Settings",
      children: (
        <Form wrapperCol={{ style: { textAlign: "right" } }}>
          <Form.Item label="Export the map as" name="" valuePropName="">
            <Switch checkedChildren="Image" unCheckedChildren="PDF" />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "3",
      label: "Options",
      children: (
        <Form wrapperCol={{ style: { textAlign: "right" } }}>
          <Form.Item label="Background Map" name="" valuePropName="">
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item label="Coordinate Grid" name="" valuePropName="">
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item label="Reference Points" name="" valuePropName="">
            <Checkbox></Checkbox>
          </Form.Item>
        </Form>
      ),
    },
  ];

  const dispatch = useDispatch();
  const openedDrawer = useSelector((state) => state.map.drawer);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedRectangle === null) {
        const x = Math.min(startCanvasPos.x, endCanvasPos.x);
        const y = Math.min(startCanvasPos.y, endCanvasPos.y);
        const width = Math.abs(startCanvasPos.x - endCanvasPos.x);
        const height = Math.abs(startCanvasPos.y - endCanvasPos.y);
        const viewerElement = document.getElementById("cesium_viewer");
        const rect = viewerElement.getBoundingClientRect();
        html2canvas(viewerElement, {
          useCORS: true,
          backgroundColor: null,
          logging: true,
          preserveDrawingBuffer: true,
          x,
          y,
          width,
          height,
        }).then((canvas) => {
          const image = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [rect.width, rect.height],
          });
          let widthScale = rect.width / width;
          let heightScale = rect.height / height;
          if (widthScale > heightScale) {
            pdf.addImage(
              image,
              "PNG",
              0,
              0,
              rect.width,
              (height * rect.width) / width
            );
          } else {
            pdf.addImage(image, "PNG", 0, 0, rect.width, rect.height);
          }
          pdf.save("rectangle_screenshot.pdf");
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
    
  }, [selectedRectangle]);

  const handleExport = async () => {
    if (isSelectedArea) {
      if (!selectedRectangle) {
        alert("No area selected!");
        return;
      } else {
        setSelectedRectangle(null);
      }
    }
     else {
      const element = document.getElementById("cesium_viewer");
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("download.pdf");
    }
  };

  const onClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer
      title="Print"
      placement="left"
      closable={false}
      onClose={onClose}
      open={openedDrawer === "print"}
    >
      <Collapse
        items={items}
        defaultActiveKey={["1", "2", "3"]}
        style={{ marginLeft: "-24px", marginRight: "-24px" }}
      />
      <br />
      <Button type="primary" block onClick={handleExport}>
        Export
      </Button>
    </Drawer>
  );
}
