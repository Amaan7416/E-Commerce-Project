import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { productDetailsReducers, productListReducers } from "./reducers/productReducers";
import {userLoginReducers, userSignupReducers} from './reducers/userReducers';
import { cartReducers } from "./reducers/cartReducers";

const reducer = combineReducers({
  productsList: productListReducers,
  productDetails: productDetailsReducers,
  userSignup:userSignupReducers,
  userLogin:userLoginReducers,
  cart:cartReducers
});

const userInfoFormStorage=localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')):null;

const cartItemsFromStorage = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')):{};



const initialState = {
  cart:{cartItems:cartItemsFromStorage, shippingAddress:shippingAddressFromStorage},
  userLogin:{userInfo:userInfoFormStorage}
};


const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;