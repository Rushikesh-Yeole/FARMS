import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// ✅ Load token from localStorage
const storedUserData = JSON.parse(localStorage.getItem("token")) || null;
const storedIsLogin = storedUserData ? true : false;

// ✅ Async action to handle login
export const login = createAsyncThunk(
  'loginuser/login',
  async ({ mobileNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        contactNumber: mobileNumber,
        password
      }, { withCredentials: true });

      localStorage.setItem("token", JSON.stringify(response.data)); // ✅ Save user data to localStorage

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
export const logoutThunk = createAsyncThunk(
  "loginuser/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/logout",
        {}, // Empty object as request body
        { withCredentials: true } // Config object
      );

      
      // Remove token from local storage
      localStorage.removeItem("token");

      return response.data; // Return response data if needed
    } catch (err) {
      console.error("Logout failed:", err);
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);

// ✅ Create slice
const loginSlice = createSlice({
  name: 'loginuser',
  initialState: {
    userData: storedUserData,  // ✅ Restore from localStorage
    isLogin: storedIsLogin,    // ✅ Restore login state
    loading: false,
    error: null,
  },
  
  reducers: {
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.isLogin = true; // ✅ Set isLogin to true after successful login
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.userData = null; // ✅ Clear user data
        state.isLogin = false; // ✅ Set isLogin to false
      });
  },
});


// export const { logout ,} = loginSlice.actions;  // ✅ Export logout action
export default loginSlice.reducer;