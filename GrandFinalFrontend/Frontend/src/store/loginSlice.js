import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Async action to handle login
export const login = createAsyncThunk(
  'loginuser/login',
  async ({ mobileNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        contactNumber: mobileNumber,
        password
      });
      
      // Use response.data as it contains the parsed JSON from the backend
      localStorage.setItem("Token",response.data.token)
      return response.data; // returns the data to be stored in the state
    } catch (error) {
      // Check if there's a response object and return the error message accordingly
      return rejectWithValue(
        error.response && error.response.data 
          ? error.response.data.message 
          : error.message
      );
    }
  }
);

// Create slice
const loginSlice = createSlice({
  name: 'loginuser',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        console.log(action.payload) // Store the user data in the state
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message in the state
      });
  },
});

export default loginSlice.reducer;
