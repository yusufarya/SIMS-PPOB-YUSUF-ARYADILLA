import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const bannerSlice = createAsyncThunk (
  "banner",
  async (token , thunkAPI) => {
    try {
        const result = await AuthService.banner(token);
        return { banner: result.data };
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

const userBannerSlice = createSlice({
   name: "banner",
   initialState,
   extraReducers : {
      [bannerSlice.fulfilled]: (state, action) => {
         state.banner = action.payload.banner;
      },
      [bannerSlice.rejected]: (state, action) => {
         state.banner = null;
      },
   },
});

const { reducer } = userBannerSlice;
export default reducer;