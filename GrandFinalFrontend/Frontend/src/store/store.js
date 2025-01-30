import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import loginReducer from "./loginSlice"
const store = configureStore({
  reducer: {
    profile: profileReducer,
    loginuser:loginReducer,
  },
});

export default store;
