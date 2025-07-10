import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load initial state from localStorage
const storedDeals = localStorage.getItem("bestDeals");

const initialState = {
  dealdata: storedDeals ? JSON.parse(storedDeals) : null,
  requestSupplyData: null,
   // Added state to store request supply response
  loading: false,
  error: null,
};

// Fetch Best Deals
export const bestDeal = createAsyncThunk(
  "deals/bestDeals",
  async (requirementId, { rejectWithValue }) => {
    try {
      console.log("Fetching best deals...");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/farmer/viewbestdeals?farmerStockId=${requirementId}`,
        { 
          withCredentials: true,
        }
      );
      console.log("Best deals response:", response.data);

      // Store response in localStorage
      localStorage.setItem("bestDeals", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Request Supply
export const requestsupply = createAsyncThunk(
  "request/requestsupply",
  async ({ groupId, farmerStockId, maxDistance }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/farmer/requestsupply`, 
        { groupId, farmerStockId, maxDistance }, // Send all data in the request body
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Request supply response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }
);


// Create Slice
const bestDealsSlice = createSlice({
  name: "bestdeal",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.error = null;
    },
    updateDealData: (state, action) => {
      // Completely replace dealdata with the new object
      state.dealdata = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Best Deals Reducers
      .addCase(bestDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bestDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealdata = action.payload;
      })
      .addCase(bestDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Request Supply Reducers
      .addCase(requestsupply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestsupply.fulfilled, (state, action) => {
        state.loading = false;
        state.requestSupplyData = action.payload;
      })
      .addCase(requestsupply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});




export const { resetErrors,updateDealData  } = bestDealsSlice.actions;
export default bestDealsSlice.reducer;
