import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch the initial state from localStorage, if it exists
const initialStateFromLocalStorage = localStorage.getItem("PostStock")
  ? JSON.parse(localStorage.getItem("PostStock"))
  : {
      stockPostData: null,
      loading: false,
      error: null
  };

export const farmerStockPost = createAsyncThunk(
  "farmerStock/Post",
  async (postStockData, { rejectWithValue }) => {
    try {
      console.log("hii");
      const response = await axios.post(
        "http://localhost:8000/farmer/poststock",
        postStockData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      console.log(response);
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

const postStockSlice = createSlice({
  name: "stockPost",
  initialState: initialStateFromLocalStorage, // Initialize from localStorage
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
        console.log("infulfill", action.payload);
        // Store the updated state in localStorage
        localStorage.setItem("PostStock", JSON.stringify(state));
      })
      .addCase(farmerStockPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postStockSlice.reducer;
