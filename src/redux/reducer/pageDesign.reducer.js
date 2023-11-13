import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoBg: `#059669`,
  mainBg: `#ddd`,
  buttonBg: `#059669`,
  cardBg: `#fff`,
  fontLink: "",
  fontCss: "",
  theme: "theme1",
};

export const pageDesignSlice = createSlice({
  name: "pageDesign",
  initialState,
  reducers: {
    setPageDesign: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
    },
    setInitialPageDesign: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPageDesign, setInitialPageDesign } = pageDesignSlice.actions;

export default pageDesignSlice.reducer;
