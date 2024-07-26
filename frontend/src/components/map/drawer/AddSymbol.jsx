import { Drawer, Modal } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../../../redux/actions/map";

const AddSymbol = ({ layer, sendSymbol, sendSymbols }) => {
  const [symbol, setSymbol] = useState("symbol.png");
  const [symbols, setSymbols] = useState([]);
  const [symbolLabels, setSymbolLabels] = useState([
    "symbol.png",
    "symbol1.png",
  ]);
  const dispatch = useDispatch();
  const openedDrawer = useSelector((state) => state.map.drawer);

  const handleOk = (symbolLabel) => {
    if (layer === 0) {
      alert("select the layer");
    } else {
      setSymbol(symbolLabel);
      setSymbols((preSymbols) => {
        return [...preSymbols, { label: symbolLabel, position: null }];
      });
      sendSymbol(symbolLabel);
    }
    dispatch(closeDrawer());
  };

  const onClose = () => {
    dispatch(closeDrawer());
  };

  useEffect(() => {
    sendSymbols(symbols);
  }, [symbols]);

  return (
    <Drawer
      title="Add Symbol"
      placement={"right"}
      closable={false}
      onClose={onClose}
      open={openedDrawer === "addSymbol"}
    >
      {symbolLabels.map((symbolLabel, key) => (
        <img
          key={key}
          src={symbolLabel}
          alt={symbolLabel}
          width="24px"
          height="24px"
          onClick={() => handleOk(symbolLabel)}
          style={{ cursor: "pointer", marginLeft: "20px" }}
        />
      ))}
    </Drawer>
  );
};

export default AddSymbol;
