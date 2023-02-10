import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleMember = createAsyncThunk(
  "fetch/singleMember",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/members/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);



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
