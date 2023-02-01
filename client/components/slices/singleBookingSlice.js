import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleBookingAsync = createAsyncThunk(
  "fetch/singleBooking",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/bookings/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const singleBookingSlice = createSlice({
  name: "singleBooking",
  initialState: {
    booking: {},
    error: null,
    isLoading: false
    },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBookingAsync.pending, (state, action) => {
      state.isLoading = true;
      state.error = null
    });
    builder.addCase(fetchSingleBookingAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.booking = action.payload;
    });
    builder.addCase(fetchSingleBookingAsync.rejected, (state, action)=> {
      state.isLoading = false;
      state.error = action.error.message
    })
  },
});

export const selectSingleChefBookings = (state) => {
  return state.singleBooking;
};

export default singleBookingSlice.reducer;
