import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  myretailerData: null,
  viewsupplier: null, 
  notification: null,
  bestDeals:null,
  loading: false,
  error: null,
};

export const viewMyOrdersThunk = createAsyncThunk(
  "retailer/viewMyOrdersThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/retailer/viewmyorders`,
        { withCredentials: true } 
      );
      console.log("Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch failed:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const retailerBestdeal = createAsyncThunk(
  "deals/retailerBestdeal",
  async (farmerStockId, { rejectWithValue }) => {
    try {
      console.log("Fetching best deals...");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/farmer/consumerdeals/viewbestdeals?farmerStockId=${farmerStockId}`,
        { withCredentials: true }
      );
      console.log("Best deals response:", response.data);
      localStorage.setItem("retailerBestdeal", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const viewSupplierThunk = createAsyncThunk(
  "retailer/viewSupplier",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/retailer/viewsupplier`,
        { withCredentials: true }
      );
      console.log("Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fetch failed:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const retailerNotificationThunk = createAsyncThunk(
  "retailer/notification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/retailer/notifications`,
        { withCredentials: true }
      );
      console.log("Notification Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Notification fetch failed:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const retailerSlice = createSlice({
  name: "retailer",
  initialState,
  reducers: {
    resetState: (state) => {
      state.myretailerData = null;
      state.viewsupplier = null; 
      state.notification = null;
      state.loading = false;
      state.error = null;
      sessionStorage.removeItem("myretailerData"); 
      sessionStorage.removeItem("viewsupplier"); 
      sessionStorage.removeItem("notification"); 
      sessionStorage.removeItem("retailerBestdeal"); 
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(viewMyOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myretailerData = action.payload;
        console.log("Orders Fetch successful:", action.payload);

        
        sessionStorage.setItem("myretailerData", JSON.stringify(action.payload));
      })
      .addCase(viewMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(retailerNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(retailerNotificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
        console.log("Notification Fetch successful:", action.payload);

        
        sessionStorage.setItem("notification", JSON.stringify(action.payload));
      })
      .addCase(retailerNotificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(viewSupplierThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewSupplierThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.viewsupplier = action.payload;
        console.log("Supplier Fetch successful:", action.payload);

   
        sessionStorage.setItem("viewsupplier", JSON.stringify(action.payload));
      })
      .addCase(viewSupplierThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
     
      .addCase(retailerBestdeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(retailerBestdeal.fulfilled, (state, action) => {
        state.loading = false;
      
        console.log("Best deal fetch successful:", action.payload);
        state.bestDeals = action.payload
        state.bestDeals = action.payload;

        sessionStorage.setItem("retailerBestdeal", JSON.stringify(action.payload));
      })
      .addCase(retailerBestdeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = retailerSlice.actions;
export default retailerSlice.reducer;
