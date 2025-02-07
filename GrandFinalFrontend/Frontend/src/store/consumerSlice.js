import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch the initial state from localStorage, if it exists
const initialState = {
  consumerPost: localStorage.getItem("consumerPostStock")
    ? JSON.parse(localStorage.getItem("consumerPostStock"))
    : null,
  myOrders: [],
  consumerbestDeal: [], // New state for storing best deals
  loading: false,
  error: null,
};

// Async thunk to post consumer data
export const consumerPostStock = createAsyncThunk(
  "consumerPostStock/post",
  async (formData, { rejectWithValue }) => {
    console.log("h2y")
    try {
      console.log("Uploading consumer post data...", formData);
      const response = await axios.post(
        "http://localhost:8000/consumer/postrequirement",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure backend supports CORS credentials
        }
      );
      console.log("Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Async thunk to fetch the best deals
export const consumerbestDeal = createAsyncThunk(
  "deals/consumerbestDeals",
  async (requirementId, { rejectWithValue }) => {
    try {
      console.log("Fetching best deals...");
      const response = await axios.get(
        `http://localhost:8000/farmer/consumerdeals/viewbestdeals?farmerStockId=${requirementId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Best deals response:", response.data);

      // Store response in localStorage
      localStorage.setItem("consumerbestDeal", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Async thunk to fetch notifications
export const consumerNotification = createAsyncThunk(
  "viewMyOrders/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/consumer/notifications",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch notifications"
      );
    }
  }
);

// Async thunk to fetch consumer's orders
export const viewMyOrders = createAsyncThunk(
  "viewMyOrders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/consumer/viewmyorders",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch orders"
      );
    }
  }
);

const consumerPostStockSlice = createSlice({
  name: "consumerPostStock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling consumerPostStock
      .addCase(consumerPostStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consumerPostStock.fulfilled, (state, action) => {
        state.loading = false;
        state.consumerPost = action.payload;
        console.log("Upload successful:", action.payload);

        // Store only the necessary data in localStorage
        localStorage.setItem("consumerPostStock", JSON.stringify(state.consumerPost));
      })
      .addCase(consumerPostStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handling consumerbestDeal
      .addCase(consumerbestDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consumerbestDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.consumerbestDeal = action.payload;
        console.log("Best deals fetched:", action.payload);
      })
      .addCase(consumerbestDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handling viewMyOrders
      .addCase(viewMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
        console.log("Fetched orders successfully:", action.payload);
      })
      .addCase(viewMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling consumer notifications
      .addCase(consumerNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consumerNotification.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched notifications:", action.payload);
      })
      .addCase(consumerNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default consumerPostStockSlice.reducer;
