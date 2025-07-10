import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/farmer/getmypendingrequest`;

// Fetch Notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch notifications"
      );
    }
  }
);

// Accept Invitation
export const acceptInvitation = createAsyncThunk(
  "notifications/acceptInvitation",
  async (pendingrequestId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/farmer/accepttransportRequest?transporterRequestId=${pendingrequestId}`,
        {}, // No body required
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to accept invitation"
      );
    }
  }
);

// Send Notification
export const sendNotification = createAsyncThunk(
  "notifications/send",
  async (message, { rejectWithValue }) => {
    try {
      const newNotification = { id: Date.now(), message };
      const response = await axios.post(API_URL, newNotification, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to send notification"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeNotification: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Accept Invitation
      .addCase(acceptInvitation.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptInvitation.fulfilled, (state, action) => {
        state.loading = false;
        console.log("accepted")
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Notification
      .addCase(sendNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
