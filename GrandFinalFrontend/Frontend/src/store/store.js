import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import loginReducer from "./loginSlice"
import postStockreducer from "./farmerStockPostSlice"
const store = configureStore({
  reducer: {
    profile: profileReducer,
    loginuser:loginReducer,
    postStock:postStockreducer
  },
});

export default store;
