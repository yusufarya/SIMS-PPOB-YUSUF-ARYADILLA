import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const serviceSlice = createAsyncThunk (
  "service",
  async (token , thunkAPI) => {
    try {
      const result = await AuthService.service(token);
      return { service: result.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const userServiceSlice = createSlice({
   name: "service",
   initialState,
   extraReducers : {
      [serviceSlice.fulfilled]: (state, action) => {
         state.service = action.payload.service;
      },
      [serviceSlice.rejected]: (state, action) => {
         state.service = null;
      },
   },
});

const { reducer } = userServiceSlice;
export default reducer;