import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  myretailerData: null,
  loading: false,
  error: null,
};

// Async thunk for fetching retailer's orders
export const viewMyOrdersThunk = createAsyncThunk(
  "retailer/viewMyOrdersThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/retailer/viewmyorders",
        { withCredentials: true } // Ensure backend supports CORS credentials
      );
      console.log("Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch failed:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create retailer slice
const retailerSlice = createSlice({
  name: "retailer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.myretailerData = null;
      state.loading = false;
      state.error = null;
      sessionStorage.removeItem("myretailerData"); // Clear session storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(viewMyOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myretailerData = action.payload;
        console.log("Fetch successful:", action.payload);

        // Store fetched data in sessionStorage
        sessionStorage.setItem("myretailerData", JSON.stringify(action.payload));
      })
      .addCase(viewMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = retailerSlice.actions;
export default retailerSlice.reducer;
