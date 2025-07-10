import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// ✅ Fetch Transport Requests
export const transreq = createAsyncThunk(
  "request/getrequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/transporter/getinfo`, {
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
  async (transportrequirementid, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/transporter/sendrequest?requirementId=${transportrequirementid}`,
        {},
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        
      );
      console.log(response.data)

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }
);
export const getPendingRequest =createAsyncThunk(
  "request/pending request",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/transporter/getpendingreq`,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        
      );
      console.log(response)

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }

)
export const getmyRequest =createAsyncThunk(
  "request/myRequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/transporter/accepted`,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        
      );
      console.log(response)

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept request"
      );
    }
  }

)




const transReqSlice = createSlice({
  name: "request",
  initialState: {
    data: [], // Stores transport requests
    loading: false,
    error: null,

    pendingRequest: [], // Stores pending transport requests
    pendingLoading: false,
    pendingError: null,

    cinfirmrequest: [], // ✅ Kept original naming

    acceptLoading: false, // Loader for accepting an invite
    acceptError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🚛 Fetch Transport Requests
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

      // ✅ Accept Transport Request
      .addCase(acceptinvite.pending, (state) => {
        state.acceptLoading = true;
        state.acceptError = null;
      })
      .addCase(acceptinvite.fulfilled, (state, action) => {
        state.acceptLoading = false;
        state.data = state.data.filter((req) => req._id !== action.meta.arg);
      })
      .addCase(acceptinvite.rejected, (state, action) => {
        state.acceptLoading = false;
        state.acceptError = action.payload;
      })

      // ⏳ Fetch Pending Requests
      .addCase(getPendingRequest.pending, (state) => {
        state.pendingLoading = true;
        state.pendingError = null;
      })
      .addCase(getPendingRequest.fulfilled, (state, action) => {
        state.pendingLoading = false;
        state.pendingRequest = action.payload;
      })
      .addCase(getPendingRequest.rejected, (state, action) => {
        state.pendingLoading = false;
        state.pendingError = action.payload;
      })

      // ✅ Fetch Confirmed Requests (cinfirmrequest)
      .addCase(getmyRequest.pending, (state) => {
        state.cinfirmLoading = true;
        state.cinfirmError = null;
      })
      .addCase(getmyRequest.fulfilled, (state, action) => {
        state.cinfirmLoading = false;
        state.cinfirmrequest = action.payload;
      })
      .addCase(getmyRequest.rejected, (state, action) => {
        state.cinfirmLoading = false;
        state.cinfirmError = action.payload;
      });
  },
});

export default transReqSlice.reducer;

