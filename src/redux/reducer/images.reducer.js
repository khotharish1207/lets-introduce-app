import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, { payload }) => {
      if (!state[payload]) {
        state[payload] = {
          url: null,
          blob: null,
          ext: null,
          mime: null,
          resized: null,
        };
      }
    },

    setImageAttr: (state, { payload }) => {
      state[payload.type] = {
        ...state[payload.type],
        ...payload.value,
      };
    },
    setImages: (state, { payload }) => {
      const obj = payload.reduce((acc, { name, ...rest }) => {
        acc[name] = rest;
        return acc;
      }, {});
      return { ...state, ...obj };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addImage, setImageAttr, setImages } = imagesSlice.actions;

export default imagesSlice.reducer;
