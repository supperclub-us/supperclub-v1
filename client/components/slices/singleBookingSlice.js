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

export const addMemberBookings = createAsyncThunk(
  "add/memberBooking",
  async ({ ...booking }) => {
    const { id, userId, newAmountOfOpenSeats } = booking
    try {
      console.log("BOOKING", booking);
      console.log("NEW AMT OF OPEN SEATS --->", newAmountOfOpenSeats)
      const { data } = await axios.put(`/api/bookings/${id}/user/${userId}`, {
        id,
        openSeats: newAmountOfOpenSeats,
      });
      console.log("DATA FROM BOOKINGS ---->", data);
      return data
    } catch (err) {
      console.error(err);
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
    builder.addCase(addMemberBookings.fulfilled, (state, action) => {
      state.booking = action.payload
    })
  },
});

export const selectSingleChefBookings = (state) => {
  return state.singleBooking;
};

export default singleBookingSlice.reducer;
