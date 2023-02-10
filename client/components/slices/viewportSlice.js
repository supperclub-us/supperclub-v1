import { createSlice } from "@reduxjs/toolkit";


const viewportSlice = createSlice({
  name: "viewport",
  initialState: {
    width: "50%",
    height: "50%",
    float: "right",
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 11,
  },
  reducers: {
    setReduxViewport(state, action) {

      state = action.payload;

      return state;

    }
  }
})

export default viewportSlice.reducer;

export const { setReduxViewport } = viewportSlice.actions;
