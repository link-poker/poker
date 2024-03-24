import { IPlayerPrivateInfoResponse } from '@link-poker/constants';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IPlayerPrivateInfoResponse = {};

const playerPrivateInfoSlice = createSlice({
  name: 'playerPrivateInfo',
  initialState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const playerPrivateInfoActions = playerPrivateInfoSlice.actions;

export default playerPrivateInfoSlice.reducer;
