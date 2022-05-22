import { createStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middle = [thunk];
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middle))
);
export default store;
