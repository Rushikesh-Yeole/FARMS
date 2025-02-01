import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import react from "react";
import axios from "axios";
export const retailerdemandthunk = createAsyncThunk(
  "retailerdemand/retailerdemandthunk",
  async (retailerdemanddata, { rejectWithValue }) => {
    try {
      const response = await axios.post("", retailerdemanddata);
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

const retailerdamndSlice = createSlice({
  name: "retailerdemand",
  initialState: {
    demandData: null,
    isLoading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(retailerdemandthunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.demandData = action.payload;
      console.log("infulfill", action.payload);
    });
    builder.addCase(retailerdemandthunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(retailerdemandthunk.rejected, (state, action) => {
      state.error = action.payload;
      console.log(state, error);
    });
  },
});

export default retailerdamndSlice.reducer;
