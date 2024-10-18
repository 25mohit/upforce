import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import SettingReducer from "./slices/settingSlice";

const rootReducer = combineReducers({
  user: UserReducer,
  settings: SettingReducer
});

export const store = configureStore({
  reducer: rootReducer
});
