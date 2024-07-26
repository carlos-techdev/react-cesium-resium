import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useRoutes } from "react-router-dom";

import "./App.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearMessage } from "./redux/actions/message";

export const App = () => {
  const routes = useRoutes(AppRoutes);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return routes;
};

export default App;

