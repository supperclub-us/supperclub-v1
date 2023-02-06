import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleMember = createAsyncThunk(
  "fetch/singleMember",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/members/${id}`);
      console.log("WOAHH--->>>", data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

// export const addMemberBookings = createAsyncThunk(
//   "add/memberBooking",
//   async ({ ...booking }) => {
//     const { id, title, menu, suggestedDonation, startDateTime, endDateTime, maxSeats, openSeats, address1, address2, city, state, zipCode, latitude, longitude, chefId, cuisineId, userId  } = booking
//     try {
//       console.log("BOOKING", booking);
//       console.log(id, title, menu)
//       const { data } = await axios.post(`/api/bookings/${id}`)
//       // const response = await axios.post(`/api/users/members/${userId}/bookings`, {
//       //   id,
//       //   // title,
//       //   // menu,
//       //   // suggestedDonation,
//       //   // startDateTime,
//       //   // endDateTime,
//       //   // maxSeats,
//       //   // openSeats,
//       //   // address1,
//       //   // address2,
//       //   // city,
//       //   // state,
//       //   // zipCode,
//       //   // latitude,
//       //   // longitude,
//       //   // chefId,
//       //   // cuisineId,
//       // });
//       console.log("DATA FROM BOOKINGS ---->", data);
//       return data
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

const initialState = {
  currentMember: {},
  isLoading: false,
  error: null,
};

const singleMemberSlice = createSlice({
  name: "singleMember",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleMember.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleMember.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentMember = action.payload;
    });
    builder.addCase(fetchSingleMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const selectSingleMember = (state) => {
  return state.singleMember;
};

export default singleMemberSlice.reducer;
