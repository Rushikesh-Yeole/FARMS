import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStockListings = createAsyncThunk(
  "stockListings/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/farmer/mystock`,{
        withCredentials:true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch stock listings"
      );
    }
  }
);

const stockListingSlice = createSlice({
  name: "stockListings",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearStockListings: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockListings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("Infullfiled: ", action.payload);
      })
      .addCase(fetchStockListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStockListings } = stockListingSlice.actions;
export default stockListingSlice.reducer;
