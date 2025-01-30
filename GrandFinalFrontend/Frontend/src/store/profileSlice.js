import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for registering a profile
export const registerProfile = createAsyncThunk(
  "profile/registerProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/signup", formData);
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
      const response = await axios.post("http://localhost:8000/api/verifyOtp", {
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


const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiledata: null,
    otpVerified: false,
    loading: false,
    otpLoading: false,
    error: null,
    otpError: null,
  },
  reducers: {
    resetErrors: (state) => {
      state.error = null;
      state.otpError = null;
    },
    // returnprofiledata: (state)=>{
    //   return state.profile;
    // },
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
        console.log("Profile data after OTP verified:", action.payload); // Log to check if data is being returned correctly
      })
      
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
      });
  },
});

export const { resetErrors } = profileSlice.actions;
export default profileSlice.reducer;
