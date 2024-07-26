import {
  Drawer,
  Collapse,
  Button,
  Form,
  Checkbox,
  Input,
  Select,
  Switch,
  ColorPicker,
  Slider,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../../redux/actions/map";

const General = () => {
  return (
    <Form wrapperCol={{ style: { textAlign: "right" } }}>
      <Form.Item label="Language" name="" valuePropName="">
        <Select style={{ width: "160px" }}>
          <Select.Option value="english">English</Select.Option>
          <Select.Option value="chinese">汉语</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Work Mode" name="" valuePropName="">
        <Select style={{ width: "160px" }}>
          <Select.Option value="extended">Extended</Select.Option>
          <Select.Option value="international">International</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Show Hints in Symbol Gallery" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Show Hints in Symbol Editor" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="MilX-Layer Advamced Settings" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
    </Form>
  );
};

const UnitSettings = () => {
  return (
    <Form wrapperCol={{ style: { textAlign: "right" } }}>
      <Form.Item label="Distance Unit" name="" valuePropName="">
        <Select style={{ width: "160px" }}>
          <Select.Option value="metric">metric</Select.Option>
          <Select.Option value="imperial">imperial</Select.Option>
          <Select.Option value="nautical">nautical</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Angular Unit" name="" valuePropName="">
        <Select style={{ width: "160px" }}>
          <Select.Option value="degree">Degree</Select.Option>
          <Select.Option value="miliradian">Miliradian (NATO)</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Time zone" name="" valuePropName="">
        <Select style={{ width: "160px" }}>
          <Select.Option value="9">I (+9)</Select.Option>
          <Select.Option value="0">Z (+0)</Select.Option>
          <Select.Option value="-12">Y (-12)</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Data&Time" name="" valuePropName="">
        <Select style={{ width: "160px" }}>
          <Select.Option value="DTG-short">DTG (short)</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

const MapSettings = () => {
  return (
    <Form wrapperCol={{ style: { textAlign: "right" } }}>
      <h3>Map Tools</h3>
      <Form.Item label="Coordinate Search" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Measure Tools" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Display Cursor Coordinate" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Show Scale" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Display Magnetic North" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Display location" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <hr />
      <h3>Coordinate Settings</h3>
      <Form.Item label="Coordinate Grid" name="" valuePropName="">
        <Select style={{ width: "160px" }}>
          <Select.Option value="none">None</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Pacific View" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Grid Color" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Grid Opacity" name="" valuePropName="">
        <Slider />
      </Form.Item>
      <Form.Item label="Grid Line Width (px)" name="" valuePropName="">
        <Slider min={1} max={10} />
      </Form.Item>
    </Form>
  );
};

const SymbolFormat = () => {
  return (
    <Form wrapperCol={{ style: { textAlign: "right" } }}>
      <Form.Item label="Grid Line Width (px)" name="" valuePropName="">
        <Slider min={0.5} max={10} step={0.1} />
      </Form.Item>
      <Form.Item label="Optimized Colors" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item
        label="Optimized Status Light Modifier Size"
        name=""
        valuePropName=""
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <hr />
      <h4>1-Point Symbols</h4>
      <Form.Item label="Symbol Size (mm)" name="" valuePropName="">
        <Input style={{ width: "160px" }} />
      </Form.Item>
      <Form.Item
        label="Size Symbols according to Echelon"
        name=""
        valuePropName=""
      >
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Show Shadow" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Symbol Filled" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Modifier-Text Color" name="" valuePropName="">
        <Input style={{ width: "160px" }} />
      </Form.Item>
      <Form.Item label="Bold Modifier-Text" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <Form.Item label="Modifier-Text Color" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Modifier-Text Background" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Colored" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Rotatable Symbols" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Scale Symbols" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Decluster Symbols" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <hr />
      <h4>Tactical Graphics</h4>
      <Form.Item label="Label Distribution (cm)" name="" valuePropName="">
        <Slider min={5} max={100} />
      </Form.Item>
      <Form.Item label="Modifier-Text Color" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Line Color" name="" valuePropName="">
        <ColorPicker showText />
      </Form.Item>
      <Form.Item label="Colored" name="" valuePropName="">
        <Checkbox></Checkbox>
      </Form.Item>
      <hr />
      <Button type="primary" block>
        Reset Symbol Format
      </Button>
    </Form>
  );
};

const PerformanceQualitySetting = () => {
  return (
    <Form wrapperCol={{ style: { textAlign: "right" } }}>
      <Form.Item label="Optimal Quality" name="" valuePropName="">
        <Slider min={1} max={4} />
      </Form.Item>
    </Form>
  );
};

const items = [
  {
    key: "1",
    label: "General",
    children: <General />,
  },
  {
    key: "2",
    label: "Unit Settings",
    children: <UnitSettings />,
  },
  {
    key: "3",
    label: "Map Settings",
    children: <MapSettings />,
  },
  {
    key: "4",
    label: "Symbol Format",
    children: <SymbolFormat />,
  },
  {
    key: "5",
    label: "Performance & Quality Setting",
    children: <PerformanceQualitySetting />,
  },
];

const Option = () => {
  const dispatch = useDispatch();
  const openedDrawer = useSelector((state) => state.map.drawer);
  const onClose = () => {
    dispatch(closeDrawer());
  };
  return (
    <Drawer
      title="Options"
      placement={"left"}
      closable={false}
      onClose={onClose}
      open={openedDrawer === "option"}
    >
      <Collapse
        items={items}
        defaultActiveKey={["1", "2", "3", "4", "5"]}
        style={{ marginLeft: "-24px", marginRight: "-24px" }}
      />
    </Drawer>
  );
};

export default Option;
