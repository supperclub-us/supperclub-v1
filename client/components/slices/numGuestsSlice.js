import { createSlice } from "@reduxjs/toolkit";

const numGuestsSlice = createSlice({
  name: "numGuests",
  initialState: 0,
  reducers: {
    setReduxNumGuests(state, action) {
      state = action.payload
      return state;
    },
  }
})

export default numGuestsSlice.reducer;

export const {
  setReduxNumGuests
} = numGuestsSlice.actions
