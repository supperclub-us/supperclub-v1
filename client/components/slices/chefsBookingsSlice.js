import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Asynchronous call to get chefs bookings
export const fetchChefsBookingsAsync = createAsyncThunk('fetch/chefsBookings', async()=>{
    try {
        const { data } = await axios.get('/api/bookings')
        console.log("AXIOS GET PAYLOAD!!!--------->", data)
        return data
    }
    catch(err){
        console.log(err)
    }
})

const chefsBookingsSlice = createSlice({
    name: "chefsBookings",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChefsBookingsAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const selectChefsBookings = (state) => {
    console.log(state)
    return state.chefsBookings
}

export default chefsBookingsSlice.reducer