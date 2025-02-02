import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load initial state from localStorage
const storedDeals = localStorage.getItem("bestDeals");
const initialState = {
  dealdata: storedDeals ? JSON.parse(storedDeals) : null,
  loading: false,
  error: null,
};
export const bestDeal = createAsyncThunk(
  "deals/bestDeals",
  async (requirementId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/farmer/viewbestdeals",
        {}, // Empty body because the params are being sent in the config
        {
          params: { farmerStockId: requirementId }, // Parameters sent in URL
          withCredentials: true
        }
      );
      console.log("inresponse", response);
      
      // Store response in localStorage
      localStorage.setItem("bestDeals", JSON.stringify(response.data));
      return response.data.demandsWithScores;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);


const bestDealsSlice = createSlice({
  name: "bestdeal",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bestDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bestDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealdata = action.payload;
        console.log("infullfileed",action.payload);
      })
      .addCase(bestDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetErrors } = bestDealsSlice.actions;
export default bestDealsSlice.reducer;
