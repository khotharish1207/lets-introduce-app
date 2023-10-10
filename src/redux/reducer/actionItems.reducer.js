import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primaryActions: [],
  secondaryActions: [],
};

export const actionItemsSlice = createSlice({
  name: "actionItems",
  initialState,
  reducers: {
    addActionItem: (state, { payload }) => {
      state[payload.actionType].push(payload.value);
    },
    removeActionItem: (state, { payload }) => {
      state[payload.actionType].splice(payload.value, 1);
    },
    onActionEdit: (state, { payload }) => {
      const { actionType, index, value } = payload;
      state[actionType][index].value = value;
    },
    setActionItems: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addActionItem, removeActionItem, onActionEdit, setActionItems } =
  actionItemsSlice.actions;

export default actionItemsSlice.reducer;
