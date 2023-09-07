import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";

export const transactionSlice = createAsyncThunk (
  "transaction",
  async (data, thunkAPI) => {
    try {
        const result = await AuthService.transactionHistory(data);
        return { transaction: result.response.data.records };
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

const transactionHistorySlice = createSlice({
   name: "transaction",
   initialState : {},
   extraReducers : {
      [transactionSlice.fulfilled]: (state, action) => {
         state.transaction = action.payload.transaction;
      },
      [transactionSlice.rejected]: (state, action) => {
         state.transaction = null;
      },
   },
});

const { reducer } = transactionHistorySlice;
export default reducer;