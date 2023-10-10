import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  endpoint: "",
  isValidEndpoint: null,
  id: "",
};

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setSite: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
    },
    setInitialSite: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const checkAvailability = createAction("site/checkAvailability");
export const saveSite = createAction("site/save");
export const getSite = createAction("site/get");

// Action creators are generated for each case reducer function
export const { setSite, setInitialSite } = siteSlice.actions;

export default siteSlice.reducer;
