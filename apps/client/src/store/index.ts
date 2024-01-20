import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import tableReducer from './slices/tableSlice';
import createTableAsUserReducer from './slices/createTableAsUserSlice';
import createTableAsGuestReducer from './slices/createTableAsGuest';

const rootReducer = combineReducers({
  user: userReducer,
  table: tableReducer,
  createTableAsUser: createTableAsUserReducer,
  createTableAsGuest: createTableAsGuestReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
