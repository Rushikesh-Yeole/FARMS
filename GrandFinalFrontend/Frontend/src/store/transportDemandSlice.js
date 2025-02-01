import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const transportDemandThunk = createAsyncThunk(
//   "transportDemand/postDemand",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/api/transportDemand", formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
//////Standard and Easy way
export const transportDemandThunk = createAsyncThunk(
  "transporterDemandSlice/transportDemandThunk",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/transportDemand", formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transportDemandSlice = createSlice({
  name: "transportDemand",
  initialState: {
    // demands: [],
    demands: null,
    status: "idle",
    error: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transportDemandThunk.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(transportDemandThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.hasError = false;
        state.demands = action.payload;
      })
      .addCase(transportDemandThunk.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload;
      });
  },
});

export default transportDemandSlice.reducer;
