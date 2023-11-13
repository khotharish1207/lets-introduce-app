import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    setSite: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
    },
    addFeature: (state, { payload }) => {
      state.push({
        title: "Section title",
        content: [],
      });
    },
    setFeatureTitle: (state, { payload }) => {
      const { title, index } = payload;
      state[index].title = title;
    },
    addContent: (state, { payload }) => {
      const { content, index } = payload;
      state[index].content.push(content);
    },
    removeContent: (state, { payload }) => {
      const { index, contentIndex } = payload;
      state[index].content.splice(contentIndex, 1);
    },
    deleteFeature: (state, { payload }) => {
      state.splice(payload, 1);
    },
    setContent: (state, { payload }) => {
      const {
        index,
        contentIndex,
        data: { key, value },
      } = payload;
      const prev = state[index].content[contentIndex];
      state[index].content[contentIndex] = key
        ? { ...prev, [key]: value }
        : value;
    },
    setInitialFeatures: (state, { payload }) => {
      return [...payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addFeature,
  deleteFeature,
  setInitialFeatures,
  addContent,
  setContent,
  removeContent,
  setFeatureTitle,
} = featureSlice.actions;

export default featureSlice.reducer;
