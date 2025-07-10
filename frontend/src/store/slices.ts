import { createSlice } from "@reduxjs/toolkit";
import { getEmail, loginUser } from "./thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    pension: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.pension = action.payload;
      })
      .addCase(getEmail.rejected, (state) => {
        state.loading = false;
      });

    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.pension = action.payload;
    })
    .addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

//export const { login, logout } = pensionSlice.actions;
//export const selectuser = (state) => state.pension.pension;

export default userSlice.reducer;
