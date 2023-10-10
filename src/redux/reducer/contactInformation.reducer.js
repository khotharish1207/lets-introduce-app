import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fname: null,
  lname: null,
  pronouns: null,
  title: null,
  biz: null,
  addr: null,
  desc: null,
  key: null,
  tracker: null,

  
};

export const counterSlice = createSlice({
  name: "contactInformation",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },

    setContactInfo: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
    },
    initiatInfo: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContactInfo, initiatInfo } = counterSlice.actions;

export default counterSlice.reducer;
