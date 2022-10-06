import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./user";
import product from "./product";
import app from "./app";
import cart from "./cart";
import socket from "./socket";
const rootReducer = combineReducers({
  app,
  user,
  product,
  cart,
  socket,
});
export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
