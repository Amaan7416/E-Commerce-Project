import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { productDetailsReducers, productListReducers } from "./reducers/productReducers";

const reducer = combineReducers({
  productsList: productListReducers,
  productDetails: productDetailsReducers
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;