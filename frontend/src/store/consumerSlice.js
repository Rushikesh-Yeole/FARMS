import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch the initial state from localStorage, if it exists
const storedConsumerPost = localStorage.getItem("consumerPostStock");
const storedBestDeals = localStorage.getItem("consumerbestDeal");

const initialState = {
  consumerPost: storedConsumerPost ? JSON.parse(storedConsumerPost) : null,
  myOrders: [],
  consumerbestDeal: storedBestDeals ? JSON.parse(storedBestDeals) : [],
  notifications: [], // Added notifications state
  loading: false,
  error: null,
};

// Async thunk to post consumer data
export const consumerPostStock = createAsyncThunk(
  "consumerPostStock/post",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Uploading consumer post data...", formData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/consumer/postrequirement`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to request supply from a farmer
export const requestsupplyconsumer = createAsyncThunk(
  "request/requestsupply",
  async ({ groupId, farmerStockId, maxDistance }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/farmer/consumerdeals/requestsupply`,
        { groupId, farmerStockId, maxDistance },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Request supply response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to accept request");
    }
  }
);

// Async thunk to fetch the best deals
export const consumerbestDeal = createAsyncThunk(
  "deals/consumerbestDeals",
  async (farmerStockId, { rejectWithValue }) => {
    try {
      console.log("Fetching best deals...");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/farmer/consumerdeals/viewbestdeals?farmerStockId=${farmerStockId}`,
        { withCredentials: true }
      );
      console.log("Best deals response:", response.data);
      localStorage.setItem("consumerbestDeal", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to fetch notifications
export const consumerNotification = createAsyncThunk(
  "viewMyOrders/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/notifications`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch notifications");
    }
  }
);

// Async thunk to fetch consumer's orders
export const viewMyOrders = createAsyncThunk(
  "viewMyOrders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/viewmyorders`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

const consumerPostStockSlice = createSlice({
  name: "consumerPostStock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(consumerPostStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consumerPostStock.fulfilled, (state, action) => {
        state.loading = false;
        state.consumerPost = action.payload;
        localStorage.setItem("consumerPostStock", JSON.stringify(state.consumerPost));
      })
      .addCase(consumerPostStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(consumerbestDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consumerbestDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.consumerbestDeal = action.payload;
      })
      .addCase(consumerbestDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(viewMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(viewMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(consumerNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consumerNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload; // Store notifications
      })
      .addCase(consumerNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default consumerPostStockSlice.reducer;
