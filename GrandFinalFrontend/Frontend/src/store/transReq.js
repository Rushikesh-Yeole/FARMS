import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const transreq = createAsyncThunk(
    'request/getrequest',
    async()=>{
        try{
            const response = await axios.get("http://localhost:8000/transporter/getinfo");

            return response.data;

        }
        catch(error){
            return isRejectedWithValue(
                error.response && error.response.data 
          ? error.response.data.message 
          : error.message
            )
        }
    }
)

const transReqSlice = createSlice({
    name: 'request',
    initialState: {
        userData: null,
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
            state.userData = action.payload;
            console.log(action.payload) // Store the user data in the state
          })
          .addCase(transreq.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store the error message in the state
          });
      },
})

export default transReqSlice.reducer;