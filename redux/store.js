import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/userSlice";
import SettingReducer from "./slices/settingSlice";
import EventsSlice from "./slices/eventsSlice";

const rootReducer = combineReducers({
  user: UserReducer,
  settings: SettingReducer,
  events: EventsSlice
});

export const store = configureStore({
  reducer: rootReducer
});
