import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch the initial state from localStorage, if it exists
const initialStateFromLocalStorage = localStorage.getItem("myStock")
  ? JSON.parse(localStorage.getItem("myStock"))
  : {
      stocks: null,
      loading: false,
      error: null,
    };

export const getMyreq = createAsyncThunk(
  "farmer/myRequest",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching my stock...");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/farmer/mystock`,
        { withCredentials: true } // Correct way to pass config
      );
      console.log(response);
      
      // Store the stocks in localStorage as a stringified array
      localStorage.setItem("myStock", JSON.stringify(response.data.stocks));
      return response.data.stocks; // Assuming `response.data.stocks` contains the stock data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const myStockInfoSlice = createSlice({
  name: "myStock",
  initialState: initialStateFromLocalStorage, // Initialize from localStorage
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyreq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyreq.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload; // Update the state with the fetched stocks
        console.log("Stocks fetched:", action.payload);

        // Store the updated state in localStorage (for persistence)
        localStorage.setItem("myStock", JSON.stringify(state));
      })
      .addCase(getMyreq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default myStockInfoSlice.reducer;
