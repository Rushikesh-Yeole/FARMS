import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch the initial state from localStorage, if it exists
const initialState = {
  stockPostData: localStorage.getItem("PostStock")
    ? JSON.parse(localStorage.getItem("PostStock"))
    : null,
  loading: false,
  error: null,
};

export const farmerStockPost = createAsyncThunk(
  "farmerStock/Post",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Uploading stock data...", formData);
      const response = await axios.post(
        "http://localhost:8000/farmer/poststock",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // Ensure backend supports CORS credentials
        }
      );
      console.log("Response received:", response.data);

      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const postStockSlice = createSlice({
  name: "stockPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(farmerStockPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(farmerStockPost.fulfilled, (state, action) => {
        state.loading = false;
        state.stockPostData = action.payload;
        console.log("Upload successful:", action.payload);

        // Store only the necessary data in localStorage
        localStorage.setItem("PostStock", JSON.stringify(state.stockPostData));
      })
      .addCase(farmerStockPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        // Ensure localStorage remains in sync
        localStorage.setItem("PostStock", JSON.stringify(state.stockPostData));
      });
  },
});

export default postStockSlice.reducer;
