import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSingleChef = createAsyncThunk(
  "fetch/singleChef",
  async (id) => {
    const token = localStorage.getItem("token")
    try {
      const { data } = await axios.get(`/api/users/chefs/${id}`, { headers: { authorization: token }});

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);


const initialState = {
  currentChef: {},
  isLoading: false,
  error: null
}

const singleChefSlice = createSlice({
  name: "singleChef",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleChef.pending, (state, action) => {
      state.isLoading = true;
      state.error = null
    });
    builder.addCase(fetchSingleChef.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentChef = action.payload;
    });
    builder.addCase(fetchSingleChef.rejected, (state, action)=> {
      state.isLoading = false;
      state.error = action.error.message
    })
  },
});

export const selectSingleChef = (state) => {
  return state.singleChef;
};

export default singleChefSlice.reducer;
