import { createSlice } from "@reduxjs/toolkit";

// const local = localStorage.getItem("local") ? JSON.parse(localStorage.getItem("local")) : {
//   width: "100%",
//   height: "100%",
//   latitude: 42.251389,
//   longitude: -71.002342,
//   zoom: 13
// };

const viewportSlice = createSlice({
  name: "viewport",
  initialState: {
    width: "50%",
    height: "50%",
    float: "right",
    latitude: 42.251389,
    longitude: -71.002342,
    zoom: 14
  },
  reducers: {
    setReduxViewport(state, action) {
      console.log("VIEWPORT ACTION ----->", action.payload)
      state = action.payload;
      console.log("STATE ---->", state)
      return state;
      // localStorage.setItem("local", JSON.stringify(state))
    }
  }
})

export default viewportSlice.reducer;

export const { setReduxViewport } = viewportSlice.actions;
