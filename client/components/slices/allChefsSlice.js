import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllChefsAsync = createAsyncThunk(
  "fetch/allChefs", async () => {
    try {
      const { data } = await axios.get("/api/users/chefs");
      return data;
    } catch (err) {
      console.log(err);
    }
  });

const allChefsSlice = createSlice({
  name: "allChefs",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllChefsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllChefs = (state) => {
  return state.allChefs;
};

export default allChefsSlice.reducer;
