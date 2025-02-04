import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import loginReducer from "./loginSlice";
import postStockreducer from "./farmerStockPostSlice";
import retailerdemandReducer from "./retailerdemandSlice";
import transportDemandSlice from "./transportDemandSlice";
import transReqReducer from "./transReq"; // Corrected import name
import getMyStockReducer from "./myStockInfo"
import requestStateusReducer from "./requsetstatusSlice"

const store = configureStore({
  reducer: {
    profile: profileReducer,
    loginuser: loginReducer,
    postStock: postStockreducer,
    retailerdemand: retailerdemandReducer,
    transportdemand: transportDemandSlice,
    transReq: transReqReducer,
    myStock:getMyStockReducer,
    requestStatus:requestStateusReducer
      },
});

export default store;

