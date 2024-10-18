import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import SettingReducer from "./slices/SettingSlice";

const rootReducer = combineReducers({
  user: UserReducer,
  settings: SettingReducer
});

export const store = configureStore({
  reducer: rootReducer
});
