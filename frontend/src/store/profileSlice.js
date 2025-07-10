import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for registering a profile
export const registerProfile = createAsyncThunk(
  "profile/registerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data ? error.response.data.message : error.message
      );
    }
  }
);

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  "profile/verifyOtp",
  async ({ phoneNumber, otp, ...rest }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/verifyOtp`, {
        phoneNumber,
        otp,
        ...rest,
      });
      
      console.log("Verified User Data:", response.data.user2);  //  Log only user data
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data ? error.response.data.message : error.message
      );
    }
  }
);

export const transportDetailsThunk = createAsyncThunk(
  "transporterDemandSlice/transportDetailsThunk",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/transporter/postDetails`,
        formData,
        { withCredentials: true }
      );
      return response.data; //  Ensure only serializable data is returned
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiledata: null,
    otpVerified: false,
    loading: false,
    otpLoading: false,
    error: null,
    otpError: null,
    transportLoading: false,
    transportError: null,
  },
  reducers: {
    resetErrors: (state) => {
      state.error = null;
      state.otpError = null;
      state.transportError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerProfile.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpVerified = true;
        state.profiledata = action.payload;
        console.log("Profile data after OTP verified:", action.payload);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
      })
      .addCase(transportDetailsThunk.pending, (state) => {
        state.transportLoading = true;
        state.transportError = null;
      })
      .addCase(transportDetailsThunk.fulfilled, (state, action) => {
        state.transportLoading = false;
        console.log(action.payload)
      })
      .addCase(transportDetailsThunk.rejected, (state, action) => {
        state.transportLoading = false;
        state.transportError = action.payload;
      });
  },
});

export const { resetErrors } = profileSlice.actions;
export default profileSlice.reducer;
