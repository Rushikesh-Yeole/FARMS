import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retailerdemandthunk = createAsyncThunk(
  "retailerdemand/retailerdemandthunk",
  async (retailerdemanddata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/retailer/postrequirement`,
        retailerdemanddata,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const retailerdemandSlice = createSlice({
  name: "retailerdemand",
  initialState: {
    demandData: null,
    isLoading: false,
    error: null, // Changed from `false` to `null` for better error handling
  },
  extraReducers: (builder) => {
    builder
      .addCase(retailerdemandthunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.demandData = action.payload;
        state.error = null; // Clear any previous errors
        console.log("Retailer demand fulfilled:", action.payload);
      })
      .addCase(retailerdemandthunk.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(retailerdemandthunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Properly set the error message
        console.error("Retailer demand failed:", action.payload);
      });
  },
});

export default retailerdemandSlice.reducer;
