import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storedUserData = JSON.parse(localStorage.getItem("userData")) || null; 
const storedIsLogin = !!storedUserData; 


export const login = createAsyncThunk(
  "loginuser/login",
  async ({ mobileNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { contactNumber: mobileNumber, password },
        { withCredentials: true }
      );

      //  Save both token and user data
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("userData", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);


export const logoutThunk = createAsyncThunk(
  "loginuser/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, { withCredentials: true });

      localStorage.removeItem("token");
      localStorage.removeItem("userData");

      return true; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);


const loginSlice = createSlice({
  name: "loginuser",
  initialState: {
    userData: storedUserData,
    isLogin: storedIsLogin,
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
        state.userData = null;
        state.isLogin = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
