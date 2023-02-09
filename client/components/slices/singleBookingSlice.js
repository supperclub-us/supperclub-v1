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
    const { id, userId, newAmountOfOpenSeats, guests } = booking;
    try {
      console.log("BOOKING", booking);
      console.log("NEW AMT OF OPEN SEATS --->", newAmountOfOpenSeats);
      const { data } = await axios.put(`/api/bookings/${id}/user/${userId}`, {
        id,
        openSeats: newAmountOfOpenSeats,
        reservedSeats: guests
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

export const deleteMemberBooking = createAsyncThunk("delete/memberBooking",   async ({ ...booking }) => {
  const { id, userId, newAmountOfOpenSeats } = booking;
  try {
    console.log("SLICE ID", id);
    console.log("SLICE userId", userId);
    const { data } = await axios.put(`/api/bookings/${id}/user/delete/${userId}`, {
      openSeats: newAmountOfOpenSeats
    });
    console.log("DATA FROM DELETE/PUT ---->", data);
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
    imageUrl,
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
          imageUrl,
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


// create thunk to delete chef bookings
// delete booking from form
// chefId, bookingsId dispatched from EditChefForm handleDelete
export const deleteSingleBooking = createAsyncThunk("delete/singleBooking", async ( {chefId, bookingsId}) => {
  try {
    const { data } = await axios.delete(`/api/users/chefs/${chefId}/bookings/${bookingsId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
})

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
    builder.addCase(editMemberBooking.fulfilled, (state, action)=> {
      state.booking = action.payload
    })
    builder.addCase(editSingleBooking.fulfilled, (state, action) => {
      state.booking = action.payload;
    });
    builder.addCase(deleteSingleBooking.fulfilled, (state, action) => {
      state.booking = {}
    });
    builder.addCase(deleteMemberBooking.fulfilled, (state, action) => {
      state.booking = action.payload
    });
  },
});

export const selectSingleBooking = (state) => {
  return state.singleBooking;
};

export default singleBookingSlice.reducer;
