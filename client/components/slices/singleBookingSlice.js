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
    const { id, userId, newAmountOfOpenSeats, reservedSeats } = booking;
    try {
      console.log("BOOKING", booking);
      console.log("NEW AMT OF OPEN SEATS --->", newAmountOfOpenSeats);
      const { data } = await axios.put(`/api/bookings/${id}/user/${userId}`, {
        id,
        openSeats: newAmountOfOpenSeats,
        reservedSeats: reservedSeats
      });
      console.log("DATA FROM BOOKINGS ---->", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const editMemberBooking = createAsyncThunk("edit/memberBooking",   async ({ ...booking }) => {
  const { id, userId, newAmountOfOpenSeats, newReservedSeats } = booking;
  try {
    console.log("BOOKING", booking);
    console.log("NEW AMT OF OPEN SEATS --->", newAmountOfOpenSeats);
    const { data } = await axios.put(`/api/bookings/${id}/user/${userId}`, {
      id,
      openSeats: newAmountOfOpenSeats,
      reservedSeats: newReservedSeats
    });
    console.log("DATA FROM BOOKINGS ---->", data);
    return data;
  } catch (err) {
    console.error(err);
  }
})

// create thunk to edit chef bookings
export const editSingleBooking = createAsyncThunk(
  "edit/singleBooking",
  async ({
    id,
    title,
    menu,
    cuisineId,
    suggestedDonation,
    startValue,
    endValue,
    max,
    openSeats,
    address1,
    address2,
    city,
    state,
    zip,
    latitude,
    longitude,
    bookingsId,
  }) => {
    try {
      const { data } = await axios.put(
        `/api/users/chefs/${id}/bookings/${bookingsId}`,
        {
          title,
          menu,
          cuisineId,
          suggestedDonation,
          startDateTime: startValue,
          endDateTime: endValue,
          maxSeats: max,
          openSeats,
          address1,
          address2,
          city,
          state,
          zipCode: zip,
          latitude,
          longitude,
          chefId: id,
        }
      );
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
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBookingAsync.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleBookingAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.booking = action.payload;
    });
    builder.addCase(fetchSingleBookingAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addMemberBookings.fulfilled, (state, action) => {
      state.booking = action.payload;
    });
    builder.addCase(editSingleBooking.fulfilled, (state, action) => {
      state.booking = action.payload;
    });
  },
});

export const selectSingleBooking = (state) => {
  return state.singleBooking;
};

export default singleBookingSlice.reducer;
