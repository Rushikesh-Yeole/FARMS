import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  myretailerData: null,
  notification: null,
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

// Async thunk for fetching retailer notifications
export const retailerNotificationThunk = createAsyncThunk(
  "retailer/notification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/retailer/notifications",
        { withCredentials: true } // Ensure backend supports CORS credentials
      );
      console.log("Notification Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Notification fetch failed:", error);
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
      state.notification = null;
      state.loading = false;
      state.error = null;
      sessionStorage.removeItem("myretailerData"); // Clear session storage
      sessionStorage.removeItem("notification"); // Clear session storage for notifications
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle viewMyOrdersThunk
      .addCase(viewMyOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myretailerData = action.payload;
        console.log("Orders Fetch successful:", action.payload);

        // Store fetched data in sessionStorage
        sessionStorage.setItem("myretailerData", JSON.stringify(action.payload));
      })
      .addCase(viewMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle retailerNotificationThunk
      .addCase(retailerNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(retailerNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
        console.log("Notification Fetch successful:", action.payload);

        // Store notifications in sessionStorage
        sessionStorage.setItem("notification", JSON.stringify(action.payload));
      })
      .addCase(retailerNotificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = retailerSlice.actions;
export default retailerSlice.reducer;
