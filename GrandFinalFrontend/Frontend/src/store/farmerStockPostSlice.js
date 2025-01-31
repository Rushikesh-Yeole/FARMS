import { createSlice } from "@reduxjs/toolkit";
import react from "react";
import { useSelector,createAsyncThunk } from "react-redux";

export const farmerStockPost = createAsyncThunk(
    "farmerStock/Post",
    async(postStockData,{rejectWithValue})=>{
        try{
            const response = await axios.post("http://localhost:8000/farmer/poststock",postStockData)
            return response.data
        }catch(error){
            return rejectWithValue(
                error.response && error.response.data ?error.response.data.message : error.message
            )
        }
    }

)
const postStockSlice = createSlice({
    name:"stockPost",
    initialState:{
        stockPostData:null,
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(farmerStockPost.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(farmerStockPost.fulfilled,(state,action)=>{
                state.loading = false
                state.stockPostData = action.payload
            })
            .addCase(farmerStockPost.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default postStockSlice.reducer