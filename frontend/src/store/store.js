import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import loginReducer from "./loginSlice";
import postStockreducer from "./farmerStockPostSlice";
import retailerdemandReducer from "./retailerdemandSlice";
import transportDemandSlice from "./transportDemandSlice";
import transReqReducer from "./transReq"; // Corrected import name
import getMyStockReducer from "./myStockInfo";
import requestStateusReducer from "./requsetstatusSlice";
import farmerStockListingReducer from "./FarmerDashBoard/stocklistingSlice";
import farmerNotificatonReducer from "./FarmerDashBoard/notificationSlice";
import bestDealreducer from "./viewBestDealsSlice"
import retailerReducer from "./retailerSlice"
import consumerReducer from "./consumerSlice"

const store = configureStore({
  reducer: {
    profile: profileReducer,
    loginuser: loginReducer,
    postStock: postStockreducer,
    retailerdemand: retailerdemandReducer,
    transportdemand: transportDemandSlice,
    transReq: transReqReducer,
    myStock: getMyStockReducer,
    requestStatus: requestStateusReducer,
    farmerstocklisting: farmerStockListingReducer,
    farmernotification: farmerNotificatonReducer,
    bestDeal:bestDealreducer,
    retailer:retailerReducer,
    consumer:consumerReducer
  },
});

export default store;
