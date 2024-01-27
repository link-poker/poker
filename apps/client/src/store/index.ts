import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createTableAsGuestReducer from './slices/createTableAsGuestSlice';
import createTableAsUserReducer from './slices/createTableAsUserSlice';
import playerPrivateInfoReducer from './slices/playerPrivateInfoSlice';
import sitDownAsUserReducer from './slices/sitDownAsUserSlice';
import tableReducer from './slices/tableSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  table: tableReducer,
  playerPrivateInfo: playerPrivateInfoReducer,
  createTableAsUser: createTableAsUserReducer,
  createTableAsGuest: createTableAsGuestReducer,
  sitDownAsUser: sitDownAsUserReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
