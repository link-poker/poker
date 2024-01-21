import { createSlice } from '@reduxjs/toolkit';
import { ITableResponse } from 'interfaces/response/ITableResponse';

const initialState: ITableResponse = {
  id: '',
  owner: {
    id: '',
    name: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  currency: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  poker: {
    bigBlind: 0,
    smallBlind: 0,
    buyIn: 0,
    activePlayers: [],
    actingPlayers: [],
    bigBlindPlayer: null,
    currentActor: null,
    currentPot: 0,
    dealer: null,
    lastActor: null,
    sidePots: [],
    smallBlindPlayer: null,
  },
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const tableActions = tableSlice.actions;

export default tableSlice.reducer;
