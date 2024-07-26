import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["message"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
export default configureStore;
