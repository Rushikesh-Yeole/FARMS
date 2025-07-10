import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state without localStorage
const initialState = {
  data: [], // Default to an empty array
  loading: false,
  error: null,
};

export const confReq = createAsyncThunk(
  "farmer/confDemands",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching my stock...");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/transporter/getpendingreq`,
        { withCredentials: true }
      );
      console.log(response);
      console.log(response.data)

      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const confReqSlice = createSlice({
  name: "confDemands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confReq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confReq.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("Stocks fetched:", action.payload);
      })
      .addCase(confReq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default confReqSlice.reducer;
