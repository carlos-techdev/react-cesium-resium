import { Viewer } from 'resium';
import React from 'react';
import {
  Container,
  Button,
  Drawer,
  Box,
  Select,
  MenuItem,
  Checkbox,
  Slider,
} from "@mui/material";
import { ColorPicker } from 'antd';
import { Print, Settings, Layers, Add } from '@mui/icons-material';
import Card from "@mui/material/Card"; 
import Collapse from "@mui/material/Collapse"; 
import CardHeader from "@mui/material/CardHeader"; 
import CardContent from "@mui/material/CardContent"; 
import KeyboardArrowDownIcon from 
	"@mui/icons-material/KeyboardArrowDown"; 
import KeyboardArrowUpIcon from 
	"@mui/icons-material/KeyboardArrowUp"; 
import IconButton from "@mui/material/IconButton"; 

export default function Cesium() {
  const [drawerToolsOpen, setDrawerToolsOpen] = React.useState(false);
  const [drawerLayersOpen, setDrawerLayersOpen] = React.useState(false);
  const [drawerAddOpen, setDrawerAddOpen] = React.useState(false);
  const [drawerPrintOpen, setDrawerPrintOpen] = React.useState(false);
  const [toolsOpen, setToolsOpen] = React.useState([true, true, true, true, true]); 
  const [formatHex, setFormatHex] = React.useState('hex');

  const toggleTools = (index) => {
    setToolsOpen(toolsOpen.map((t, i) => i === index ? !t : t));
  }

  const [setting, setSetting] = React.useState({
    language: "english",
    workMode: "international",
    show_hints_in_symbol_gallery: true,
    show_hints_in_symbol_editor: true,
    tutorial: true,

    distanceUnit: "metric",
    angularUnit: "degree",
    geoDegreeFormat: "decimal",
    timeZone: "z",
    dateTime: "DTG (full)",

    brightness: 0,
    hue: 0,
    chroma: 75,
    coordinateSearch: false,
    measureTools: false,
    displayCursorCoordinate: false,
    showScale: false,
    displayMagneticNorth: false,
    displayLocation: false,

    lineWidth: 2.5,
    optimizedColors: true,
    optimizedStatusLightModifierSize: false,
    symbolSize: "15",
    sizeSymbolsAccordingToEchelon: false,
    showShadow: false,
    symbolFilled: true,
    optionalFrameFormat: "framed",
    modifierTextSize: 99,
    boldModifierText: false,
    modifierTextColor1: "#ffffff",
    modifierTextBackground1: "#ffffff",
    lineColor1: "#ffffff",
    colored1: false,
    rotatableSymbols: false,
    scaleSymbols: false,
    declusterSymbols: false,
    labelDistribution: 35,
    modifierTextColor2: "#ffffff",
    lineColor2: "#ffffff",
    colored2: false,

    quality: 50,
  }); 

  const toggleToolsDrawer = (newOpen) => () => {
    setDrawerToolsOpen(newOpen);
  };
  const toggleLayersDrawer = (newOpen) => () => {
    setDrawerLayersOpen(newOpen);
  };
  const toggleAddDrawer = (newOpen) => () => {
    setDrawerAddOpen(newOpen);
  };
  const togglePrintDrawer = (newOpen) => () => {
    setDrawerPrintOpen(newOpen);
  };

  const settingChange = (event) => {
    setSetting({
      ...setting,
      [event.target.name]: event.target.value
    });
  };

  const settingColorChange = (value, name) => {
    setSetting({
      ...setting,
      [name]: value.toHexString()
    });
  }

  const settingCheck = (event) => {
    setSetting({
      ...setting,
      [event.target.name]: event.target.checked
    });
  };

  const toolList = [
    {
      title: (<span style={{fontSize: "16px"}}>General:</span>),
      content: (
        <Container> 
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Language</span>
            <Select
              value={setting.language}
              onChange={settingChange}
              name={"language"}
              style={{width: '100px', height: "38px"}}
            >
              <MenuItem value={"english"}>English</MenuItem>
              <MenuItem value={"chinese"}>中文</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Work Mode</span>
            <Select
              value={setting.workMode}
              onChange={settingChange}
              name={"workMode"}
              style={{width: '150px', height: "38px"}}
            >
              <MenuItem value={"international"}>International</MenuItem>
              <MenuItem value={"extended"}>Extended</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Show Hints in Symbol Gallery</span>
            <Checkbox size="small" name="show_hints_in_symbol_gallery" checked={setting.show_hints_in_symbol_gallery} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Show Hints in Symbol Editor</span>
            <Checkbox size="small" name="show_hints_in_symbol_editor" checked={setting.show_hints_in_symbol_editor} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Tutoral</span>
            <Checkbox size="small" name="tutorial" checked={setting.tutorial} onChange={settingCheck} />
          </Box>
        </Container> 
      )
    },
    {
      title: (<span style={{fontSize: "16px"}}>Unit Settings:</span>),
      content: (
        <Container> 
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Distance Unit</span>
            <Select
              value={setting.distanceUnit}
              onChange={settingChange}
              name={"distanceUnit"}
              style={{width: '130px', height: "38px"}}
            >
              <MenuItem value={"metric"}>Metric</MenuItem>
              <MenuItem value={"imperial"}>Imperial</MenuItem>
              <MenuItem value={"nautical"}>Nautical</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Distance Unit</span>
            <Select
              value={setting.angularUnit}
              onChange={settingChange}
              name={"angularUnit"}
              style={{width: '180px', height: "38px"}}
            >
              <MenuItem value={"degree"}>Degree</MenuItem>
              <MenuItem value={"milliradian"}>Milliradian(NATO)</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Geo.Degree Format</span>
            <Select
              value={setting.geoDegreeFormat}
              onChange={settingChange}
              name={"geoDegreeFormat"}
              style={{width: '150px', height: "38px"}}
            >
              <MenuItem value={"decimal"}>Decimal</MenuItem>
              <MenuItem value={"sexagesimal"}>Sexagesimal</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Time Zone</span>
            <Select
              value={setting.timeZone}
              onChange={settingChange}
              name={"timeZone"}
              style={{width: '100px', height: "38px"}}
            >
              <MenuItem value={"z"}>Z(+0)</MenuItem>
              <MenuItem value={"y"}>Y(-12)</MenuItem>
              <MenuItem value={"x"}>X(-11)</MenuItem>
              <MenuItem value={"w"}>W(-10)</MenuItem>
              <MenuItem value={"v"}>V(-9)</MenuItem>
              <MenuItem value={"u"}>U(-8)</MenuItem>
              <MenuItem value={"t"}>T(-7)</MenuItem>
              <MenuItem value={"s"}>S(-6)</MenuItem>
              <MenuItem value={"r"}>R(-5)</MenuItem>
              <MenuItem value={"q"}>Q(-4)</MenuItem>
              <MenuItem value={"p"}>P(-3)</MenuItem>
              <MenuItem value={"o"}>O(-2)</MenuItem>
              <MenuItem value={"n"}>N(-1)</MenuItem>
              <MenuItem value={"a"}>A(+1)</MenuItem>
              <MenuItem value={"b"}>B(+2)</MenuItem>
              <MenuItem value={"c"}>C(+3)</MenuItem>
              <MenuItem value={"d"}>D(+4)</MenuItem>
              <MenuItem value={"e"}>E(+5)</MenuItem>
              <MenuItem value={"f"}>F(+6)</MenuItem>
              <MenuItem value={"g"}>G(+7)</MenuItem>
              <MenuItem value={"h"}>H(+8)</MenuItem>
              <MenuItem value={"i"}>I(+9)</MenuItem>
              <MenuItem value={"k"}>K(+10)</MenuItem>
              <MenuItem value={"l"}>L(+11)</MenuItem>
              <MenuItem value={"m"}>M(+12)</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Date & Time</span>
            <Select
              value={setting.dateTime}
              onChange={settingChange}
              name={"dateTime"}
              style={{width: '225px', height: "38px"}}
            >
              <MenuItem value={"DTG (short)"}>DTG (short)</MenuItem>
              <MenuItem value={"DTG (full)"}>DTG (full)</MenuItem>
              <MenuItem value={"DTG (time)"}>DTG (time)</MenuItem>
              <MenuItem value={"hh:mm:ss"}>hh:mm:ss</MenuItem>
              <MenuItem value={"hh:mm:ss DD/MM/YY"}>hh:mm:ss DD/MM/YY</MenuItem>
              <MenuItem value={"hh:mm:ss DD/MM/YYYY"}>hh:mm:ss DD/MM/YYYY</MenuItem>
              <MenuItem value={"DD/MM/YY"}>DD/MM/YY</MenuItem>
              <MenuItem value={"DD/MM/YYYY"}>DD/MM/YYYY</MenuItem>
              <MenuItem value={"MM/YY"}>MM/YY</MenuItem>
              <MenuItem value={"MM/YYYY"}>MM/YYYY</MenuItem>
            </Select>
          </Box>
        </Container> 
      )
    },
    {
      title: (<span style={{fontSize: "16px"}}>Map Settings:</span>),
      content: (
        <Container> 
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Brightness</span>
            <Slider value={setting.brightness} size="small" min={-100} max={100} valueLabelDisplay="auto" style={{width: "200px"}} onChange={settingChange} name="brightness" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Hue</span>
            <Slider value={setting.hue} size="small" min={0} max={359} valueLabelDisplay="auto" style={{width: "200px"}} onChange={settingChange} name="hue" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Chroma</span>
            <Slider value={setting.chroma} size="small" min={0} max={100} valueLabelDisplay="auto" style={{width: "200px"}} onChange={settingChange} name="chroma" />
          </Box>
          <hr />
          <h4>Map Tools</h4>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Coordinate Search</span>
            <Checkbox size="small" name="coordinateSearch" checked={setting.coordinateSearch} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Measure Tools</span>
            <Checkbox size="small" name="measureTools" checked={setting.measureTools} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Display Cursor Coordinate</span>
            <Checkbox size="small" name="displayCursorCoordinate" checked={setting.displayCursorCoordinate} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Show Scale</span>
            <Checkbox size="small" name="showScale" checked={setting.showScale} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Display Magnetic North</span>
            <Checkbox size="small" name="displayMagneticNorth" checked={setting.displayMagneticNorth} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Display Location</span>
            <Checkbox size="small" name="displayLocation" checked={setting.displayLocation} onChange={settingCheck} />
          </Box>
        </Container> 
      )
    },
    {
      title: (<span style={{fontSize: "16px"}}>Symbol Format:</span>),
      content: (
        <Container> 
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Line Width(%)</span>
            <Slider value={setting.lineWidth} size="small" step={0.5} min={0} max={10} valueLabelDisplay="auto" style={{width: "200px"}} onChange={settingChange} name="lineWidth" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Optimized Colors</span>
            <Checkbox size="small" name="optimizedColors" checked={setting.optimizedColors} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Optimized Status Light Modifier Size</span>
            <Checkbox size="small" name="optimizedStatusLightModifierSize" checked={setting.optimizedStatusLightModifierSize} onChange={settingCheck} />
          </Box>
          <hr />
          <h4>1-Point Symbols</h4>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Symbol Size(mm)</span>
            <Select
              value={setting.symbolSize}
              onChange={settingChange}
              name={"symbolSize"}
              style={{width: '120px', height: "38px"}}
            >
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"15"}>15</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"25"}>25</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Size Symbols according to Echelon</span>
            <Checkbox size="small" name="sizeSymbolsAccordingToEchelon" checked={setting.sizeSymbolsAccordingToEchelon} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Show Shadow</span>
            <Checkbox size="small" name="showShadow" checked={setting.showShadow} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Symbol Filled</span>
            <Checkbox size="small" name="symbolFilled" checked={setting.symbolFilled} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Optional Frame Format</span>
            <Select
              value={setting.optionalFrameFormat}
              onChange={settingChange}
              name={"optionalFrameFormat"}
              style={{width: '120px', height: "38px"}}
            >
              <MenuItem value={"framed"}>Framed</MenuItem>
              <MenuItem value={"unframed"}>Unframed</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Modifier-Text Size(%)</span>
            <Slider value={setting.modifierTextSize} size="small" min={1} max={100} valueLabelDisplay="auto" style={{width: "200px"}} onChange={settingChange} name="modifierTextSize" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Bold Modifier-Text</span>
            <Checkbox size="small" name="boldModifierText" checked={setting.boldModifierText} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Modifier-Text Color</span>
            <ColorPicker value={setting.modifierTextColor1} name="modifierTextColor1" onChange={(v) => settingColorChange(v, "modifierTextColor1")} format={formatHex} onFormatChange={setFormatHex} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Modifier-Text Background</span>
            <ColorPicker value={setting.modifierTextBackground1} name="modifierTextBackground1" onChange={(v) => settingColorChange(v, "modifierTextBackground1")} format={formatHex} onFormatChange={setFormatHex} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Line Color</span>
            <ColorPicker value={setting.lineColor1} name="lineColor1" onChange={(v) => settingColorChange(v, "lineColor1")} format={formatHex} onFormatChange={setFormatHex} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Colored</span>
            <Checkbox size="small" name="colored1" checked={setting.colored1} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Rotatable Symbols</span>
            <Checkbox size="small" name="rotatableSymbols" checked={setting.rotatableSymbols} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Scale Symbols</span>
            <Checkbox size="small" name="scaleSymbols" checked={setting.scaleSymbols} onChange={settingCheck} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Decluster Symbols</span>
            <Checkbox size="small" name="declusterSymbols" checked={setting.declusterSymbols} onChange={settingCheck} />
          </Box>
          <hr />
          <h4>Tactical Graphics</h4>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Label Distribution(cm)</span>
            <Slider value={setting.labelDistribution} size="small" min={5} max={100} valueLabelDisplay="auto" style={{width: "200px"}} onChange={settingChange} name="labelDistribution" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Modifier-Text Color</span>
            <ColorPicker value={setting.modifierTextColor2} name="modifierTextColor2" onChange={(v) => settingColorChange(v, "modifierTextColor2")} format={formatHex} onFormatChange={setFormatHex} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Line Color</span>
            <ColorPicker value={setting.lineColor2} name="lineColor2" onChange={(v) => settingColorChange(v, "lineColor2")} format={formatHex} onFormatChange={setFormatHex} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Colored</span>
            <Checkbox size="small" name="colored2" checked={setting.colored2} onChange={settingCheck} />
          </Box>
        </Container> 
      )
    },
    {
      title: (<span style={{fontSize: "16px"}}>Performance & Quality Settings:</span>),
      content: (
        <Container> 
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px", alignItems: "center" }}>
            <span>Quality</span>
            <Slider value={setting.quality} size="small" min={0} max={100} valueLabelDisplay="auto" style={{width: "200px"}} onChange={settingChange} name="quality" />
          </Box>
        </Container> 
      )
    }
  ]

  return (
    <>
      <Viewer full />
      <Container>
        <Button variant="contained" onClick={toggleToolsDrawer(true)} style={{
          position: "fixed",
          top: '10px',
          left: '10px',
          minWidth: "40px",
          minHeight: "40px",
          padding: "6px 6px"
        }} ><Settings /></Button>
        <Button variant="contained" onClick={toggleLayersDrawer(true)} style={{
          position: "fixed",
          top: '60px',
          left: '10px',
          minWidth: "40px",
          minHeight: "40px",
          padding: "6px 6px"
        }} ><Layers /></Button>
        <Button variant="contained" onClick={toggleAddDrawer(true)} style={{
          position: "fixed",
          top: '110px',
          left: '10px',
          minWidth: "40px",
          minHeight: "40px",
          padding: "6px 6px"
        }} ><Add /></Button>
        <Button variant="contained" onClick={togglePrintDrawer(true)} style={{
          position: "fixed",
          top: '160px',
          left: '10px',
          minWidth: "40px",
          minHeight: "40px",
          padding: "6px 6px"
        }} ><Print /></Button>
        <Drawer open={drawerToolsOpen} onClose={toggleToolsDrawer(false)}>
          <Container style={{
            width: "400px",
            padding: "0"
          }}>
          {toolList.map((tool, index) => (
            <Card key={index}> 
              <CardHeader 
                title={tool.title}
                onClick={() => toggleTools(index)}
                style={{cursor: "pointer"}}
                action={ 
                  <IconButton 
                    aria-label="expand"
                    size="small"
                  > 
                    {toolsOpen[index] ? <KeyboardArrowUpIcon /> 
                      : <KeyboardArrowDownIcon />} 
                  </IconButton> 
                } 
              ></CardHeader> 
              <div> 
                <Collapse in={toolsOpen[index]} timeout="auto"
                  unmountOnExit> 
                  <CardContent> 
                    {tool.content}
                  </CardContent> 
                </Collapse> 
              </div> 
            </Card>
          ))}
          </Container>
        </Drawer>
        <Drawer open={drawerLayersOpen} onClose={toggleLayersDrawer(false)}>
          <Container style={{
            width: "400px",
            padding: "0"
          }}>
          </Container>
        </Drawer>
        <Drawer open={drawerAddOpen} onClose={toggleAddDrawer(false)}>
          <Container style={{
            width: "400px",
            padding: "0"
          }}>
          </Container>
        </Drawer>
        <Drawer open={drawerPrintOpen} onClose={togglePrintDrawer(false)}>
          <Container style={{
            width: "400px",
            padding: "0"
          }}>
          </Container>
        </Drawer>
      </Container>
    </>
  )
}