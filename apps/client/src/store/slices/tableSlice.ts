import { createSlice } from '@reduxjs/toolkit';
import { ITableResponse } from 'interfaces/response/ITableResponse';

const initialState: ITableResponse = {
  id: '',
  user: {
    id: '',
    name: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  currency: '',
  smallBlind: 0,
  bigBlind: 0,
  buyIn: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const tableActions = tableSlice.actions;

export default tableSlice.reducer;
