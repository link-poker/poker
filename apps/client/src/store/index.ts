import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createTableAsGuestReducer from './slices/createTableAsGuestSlice';
import createTableAsUserReducer from './slices/createTableAsUserSlice';
import getTableReducer from './slices/getTableSlice';
import getUserReducer from './slices/getUserSlice';
import playerPrivateInfoReducer from './slices/playerPrivateInfoSlice';
import sitDownAsGuestReducer from './slices/sitDownAsGuestSlice';
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
  sitDownAsGuest: sitDownAsGuestReducer,
  getUser: getUserReducer,
  getTable: getTableReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
