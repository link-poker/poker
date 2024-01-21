import { createSlice } from '@reduxjs/toolkit';
import { IPlayerPrivateInfoResponse } from 'interfaces/response/IPlayerPrivateInfoResponse';

const initialState: IPlayerPrivateInfoResponse = {
  holeCards: null,
  hand: null,
};

const playerPrivateInfoSlice = createSlice({
  name: 'playerPrivateInfo',
  initialState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const playerPrivateInfoActions = playerPrivateInfoSlice.actions;

export default playerPrivateInfoSlice.reducer;
