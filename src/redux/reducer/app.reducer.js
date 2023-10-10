import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log("payload", payload);
      state.user = { ...payload };
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading } = appSlice.actions;

export const getUser = createAction("getUser");

export default appSlice.reducer;
