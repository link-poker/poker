import { ITableResponse } from '@link-poker/constants';
import { createSlice } from '@reduxjs/toolkit';
import { TABLE_STATUS } from 'constants/table';

const initialTableState: ITableResponse = {
  id: '',
  owner: {
    id: '',
    name: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  currency: '',
  status: TABLE_STATUS.WAITING,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  poker: {
    gameId: '',
    bigBlind: 0,
    smallBlind: 0,
    buyIn: 0,
    players: [],
    activePlayers: [],
    actingPlayers: [],
    sidePots: [],
    commonCards: [],
  },
};

const tableSlice = createSlice({
  name: 'table',
  initialState: initialTableState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const tableActions = tableSlice.actions;

export default tableSlice.reducer;
