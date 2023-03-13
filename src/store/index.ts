import { configureStore, combineReducers } from "@reduxjs/toolkit";

import settingReducer from "./setting";

const store = configureStore({
  reducer: combineReducers({
    setting: settingReducer.reducer,
  }),
});

export const acitons = {
  setting: settingReducer.actions,
};

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
