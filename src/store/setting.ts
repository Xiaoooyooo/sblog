import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  asideWidth: Number(localStorage.getItem("aside-width") || 250),
};

const settingReducer = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resizeAside: (state, actions: PayloadAction<number>) => {
      const offset = actions.payload;
      if (
        state.asideWidth + offset >= 150 &&
        state.asideWidth + offset <= 450
      ) {
        state.asideWidth += offset;
        localStorage.setItem("aside-width", JSON.stringify(state.asideWidth));
      }
    },
  },
});

export default settingReducer;
