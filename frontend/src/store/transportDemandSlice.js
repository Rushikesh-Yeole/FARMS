import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Thunk to post a transport demand
export const transportDemandThunk = createAsyncThunk(
  "transporterDemandSlice/transportDemandThunk",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/farmer/reqtransporter`,
        formData,
        { withCredentials: true }
      );
      return response.data; //  Ensure only serializable data is returned
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

//  Thunk to fetch transport demands by farmer ID
export const myTransportDemand = createAsyncThunk(
  "transporterDemandSlice/myDemands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/farmer/farmFeed`, // Farmer ID as query parameter
        
        { withCredentials: true }
      );
      return response.data; // ✅ Only return serializable data
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
// export const pendingrequest = createAsyncThunk("transporterDemandSlice/pendingrequest",
//   async(,{rejectWithValue})=>{

//   }
// )


const transportDemandSlice = createSlice({
  name: "transportDemand",
  initialState: {
    demands: null,
    myDemands: null,
    status: "idle",
    error: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {}, // No standard reducers needed

  extraReducers: (builder) => {
    builder
      // ✅ Handling transport demand request
      .addCase(transportDemandThunk.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(transportDemandThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.hasError = false;
        state.demands = action.payload;
        console.log("Transport demand posted successfully:", action.payload);
      })
      .addCase(transportDemandThunk.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload;
      })

      // ✅ Handling fetching transport demands by farmer ID
      .addCase(myTransportDemand.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(myTransportDemand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.hasError = false;
        state.myDemands = action.payload;
        console.log("Fetched transport demands:", action.payload);
      })
      .addCase(myTransportDemand.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload;
      });
  },
});

export default transportDemandSlice.reducer;

