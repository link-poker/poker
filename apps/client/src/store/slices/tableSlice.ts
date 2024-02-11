import { createSlice } from '@reduxjs/toolkit';
import { TABLE_STATUS } from 'constants/table';
import { ITableResponse } from 'interfaces/response/ITableResponse';

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
    bigBlind: 0,
    smallBlind: 0,
    buyIn: 0,
    players: [],
    activePlayers: [],
    actingPlayers: [],
    currentActor: null,
    currentRound: null,
    currentBet: null,
    currentPot: null,
    dealer: null,
    lastActor: null,
    sidePots: [],
    smallBlindPlayer: null,
    bigBlindPlayer: null,
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
