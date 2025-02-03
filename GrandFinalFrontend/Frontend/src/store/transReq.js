import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const transreq = createAsyncThunk(
    'request/getrequest',
    async(_, { rejectWithValue }) => { // Correct error handling
        try {
          const response = await axios.get("http://localhost:8000/transporter/getinfo", {
            withCredentials: true, // Ensures cookies are sent with the request
        });
        
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

const transReqSlice = createSlice({
    name: 'request',
    initialState: {
        data: null, // Changed from userData to data
        loading: false,
        error: null,
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
            state.data = action.payload; // Store response in 'data'
            console.log(action.payload);
          })
          .addCase(transreq.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
});

export default transReqSlice.reducer;
