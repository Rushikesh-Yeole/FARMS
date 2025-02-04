import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// ✅ Fetch Transport Requests
export const transreq = createAsyncThunk(
  "request/getrequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/transporter/getinfo", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transport requests"
      );
    }
  }
);

//  Accept Transport Request
export const acceptinvite = createAsyncThunk(
  "request/accept",
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/transporter/confirmRequest?transportrequirementid=${requestId}`,
        {},
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }
);

const transReqSlice = createSlice({
  name: "request",
  initialState: {
    data: [], //  Changed from null to an empty array
    loading: false,
    error: null,
    acceptLoading: false, //  Added for accepting invite
    acceptError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(transreq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transreq.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(transreq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(acceptinvite.pending, (state) => {
        state.acceptLoading = true;
        state.acceptError = null;
      })
      .addCase(acceptinvite.fulfilled, (state, action) => {
        state.acceptLoading = false;
      
        state.data = state.data.filter(req => req._id !== action.meta.arg);
      })
      .addCase(acceptinvite.rejected, (state, action) => {
        state.acceptLoading = false;
        state.acceptError = action.payload;
      });
  },
});

export default transReqSlice.reducer;
