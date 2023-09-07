import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

const profile = sessionStorage.getItem("userData");

export const profileSlice = createAsyncThunk(
    "profile",
    async (token , thunkAPI) => {
      try {
        const result = await AuthService.profile(token);
        if (result.data) {
          return { profile: result.data };
        } else {
          return { profile: result };
        }
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

const initialState = profile 
? {profile} : {};

const userDataSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers : {
        [profileSlice.fulfilled]: (state, action) => {
            state.profile = action.payload.profile;
        },
        [profileSlice.rejected]: (state, action) => {
            state.profile = null;
        },
    },
});

const { reducer } = userDataSlice;
export default reducer;