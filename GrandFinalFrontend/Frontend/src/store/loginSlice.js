import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Load token correctly from localStorage
const storedToken = localStorage.getItem("token");
const storedUserData = storedToken ? JSON.parse(storedToken) : null;
const storedIsLogin = !!storedUserData; // Convert to boolean

// ✅ Async action for login
export const login = createAsyncThunk(
  "loginuser/login",
  async ({ mobileNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { contactNumber: mobileNumber, password },
        { withCredentials: true }
      );

      // ✅ Store only the token in localStorage
      localStorage.setItem("token", JSON.stringify(response.data.token));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ✅ Async action for logout
export const logoutThunk = createAsyncThunk(
  "loginuser/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true });

      // ✅ Remove token from localStorage on logout
      localStorage.removeItem("token");

      return true; // Logout successful
    } catch (err) {
      console.error("Logout failed:", err);
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);

// ✅ Create slice
const loginSlice = createSlice({
  name: "loginuser",
  initialState: {
    userData: storedUserData, // ✅ Load from localStorage
    isLogin: storedIsLogin, // ✅ Ensure login state persists
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
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.userData = null;
        state.isLogin = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        //  Even if API fails, clear user session
        state.userData = null;
        state.isLogin = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
