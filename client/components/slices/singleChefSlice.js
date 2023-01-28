import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleChef = createAsyncThunk(
  "fetch/singleChef",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/chefs/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


const singleChefSlice = createSlice({
  name: "singleChef",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleChef.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleChef = (state) => {
  return state.singleChef;
};

export default singleChefSlice.reducer;
