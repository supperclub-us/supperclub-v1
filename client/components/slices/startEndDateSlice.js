import { createSlice } from "@reduxjs/toolkit";

const startEndDateSlice = createSlice({
  name: "startEndDate",
  initialState: {
    startDate: [],
    endDate: []
  },
  reducers: {
    setReduxStartDate(state, action) {
      state.startDate = action.payload
      return state;
    },
    setReduxEndDate(state, action) {
      state.endDate = action.payload
      return state;
    }
  }
})

export default startEndDateSlice.reducer;

export const {
  setReduxStartDate,
  setReduxEndDate,
} = startEndDateSlice.actions
