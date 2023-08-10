import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productCreateReviewReducer,
  productUpdateReducer,
  productTopRatedReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userLoginRefreshReducer,
  userRegisterReducer,
  userSendEmailVerificationReducer,
  userConfirmReducer,
  userResetPasswordReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListUserReducer,
  orderListAllReducer,
} from "./reducers/orderReducers";

import { cartReducer } from "./reducers/cartReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productCreateReview: productCreateReviewReducer,
  productUpdate: productUpdateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userLoginRefresh: userLoginRefreshReducer,
  userRegister: userRegisterReducer,
  userSendEmailVerification: userSendEmailVerificationReducer,
  userConfirm: userConfirmReducer,
  userResetPassword: userResetPasswordReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListUser: orderListUserReducer,
  orderListAll: orderListAllReducer,
});

// get a few cart items from the local storage
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// get user info from local storage
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// get the shipping address from local storage
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// get refresh token from local storage
const tokenInfoFromLocalStorage = localStorage.getItem("refreshToken")
  ? localStorage.getItem("refreshToken")
  : null;

// set the initial state based on above local storage value
const initialState = {
  cart: {
    cartItems: [...cartItemsFromLocalStorage],
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
  userLoginRefresh: {
    tokenInfo: tokenInfoFromLocalStorage,
  },
};

// user redux thunk for making async calls
// const middleware = [thunk];

//create the redux store
const store = configureStore({
  reducer: rootReducer,
  initialState,
  middleware: [thunk],
});

export default store;
