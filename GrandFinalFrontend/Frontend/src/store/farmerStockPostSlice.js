import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import react from "react";
// import {createAsyncThunk } from "react-redux";   WRONG 

export const farmerStockPost = createAsyncThunk(
    "farmerStock/Post",
    async(postStockData,{rejectWithValue})=>{
        try{
            console.log("hii")
            const response = await axios.post("http://localhost:8000/farmer/poststock",postStockData,{ headers: { "Content-Type": "multipart/form-data" },withCredentials: true });
            console.log(response)
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
                console.log("infulfill",action.payload)
            })
            .addCase(farmerStockPost.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default postStockSlice.reducer