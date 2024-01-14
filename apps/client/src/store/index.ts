import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { tableReducer } from './reducers/tableReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  table: tableReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
