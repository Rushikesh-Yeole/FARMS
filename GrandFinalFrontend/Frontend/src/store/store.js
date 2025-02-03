import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import loginReducer from "./loginSlice";
import postStockreducer from "./farmerStockPostSlice";
import retailerdemandReducer from "./retailerdemandSlice";
import transportDemandSlice from "./transportDemandSlice";
import transReqReducer from "./transReq"; // Corrected import name
import getMyStockReducer from "./myStockInfo"

const store = configureStore({
  reducer: {
    profile: profileReducer,
    loginuser: loginReducer,
    postStock: postStockreducer,
    retailerdemand: retailerdemandReducer,
    transportdemand: transportDemandSlice,
    transReq: transReqReducer,
    myStock:getMyStockReducer
      },
});

export default store;

