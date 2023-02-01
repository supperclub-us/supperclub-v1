import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleMember = createAsyncThunk(
    "fetch/singleMember",
    async (id) => {
        try {
            const { data } = await axios.get(`/api/users/members/${id}`);
            console.log("WOAHH--->>>", data)
            return data;

        } catch (err) {
            console.lof(err);
        }
    }
);


const singleMemberSlice = createSlice({
    name: "singleMember",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleMember.fulfilled, (state,action) => {
            return action.payload;
        });
    },
});

export const selectSingleMember = (state) => {
    return state.singleMember;
};

export default singleMemberSlice.reducer;