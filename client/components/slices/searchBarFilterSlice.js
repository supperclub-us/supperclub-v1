import { createSlice } from "@reduxjs/toolkit";

const searchBarFilterSlice = createSlice({
  name: "searchBarFilter",
  initialState: {
    startDate: [],
    endDate: [],
    numGuests: 1,
  },
  reducers: {
    setReduxStartDate(state, action) {
      state.startDate = action.payload
      return state;
    },
    setReduxEndDate(state, action) {
      state.endDate = action.payload
      return state;
    },
    setReduxNumGuests(state, action) {
      state.numGuests = action.payload
      return state;
    },
  }
})

export default searchBarFilterSlice.reducer;

export const {
  setReduxStartDate,
  setReduxEndDate,
  setReduxNumGuests
} = searchBarFilterSlice.actions
