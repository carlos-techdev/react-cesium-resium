import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/configureStore";
import { ClimbingBoxLoader } from "react-spinners";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Ion } from "cesium";
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYTVhOGZjYS03ZmUxLTQ2NjctOGM4MC0wOWZkOWNmZDE0MDMiLCJpZCI6MjIyMjcxLCJpYXQiOjE3MTg1OTYxNDN9._Bvcy3DexnxHYmwGCq3tyE1J6_yF-5Km1awas4wLztY";

const root = ReactDOM.createRoot(document.getElementById("root"));

const defaultTheme = createTheme();
const loaderStyle = {
  color: defaultTheme.palette.primary.main,
  background: defaultTheme.palette.background.default,
};
const { store, persistor } = configureStore();

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="sweet-loading">
                <ClimbingBoxLoader color={loaderStyle.color} loading={true} />
              </div>
            }
          >
            <App />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

