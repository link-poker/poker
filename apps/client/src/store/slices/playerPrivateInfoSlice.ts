import { IPlayerPrivateInfoResponse } from '@link-poker/constants';
import { createSlice } from '@reduxjs/toolkit';
import { PLAYER_PRIVATE_INFO_SLICE_PATH } from 'constants/slicePath';

const initialState: IPlayerPrivateInfoResponse = {};

const playerPrivateInfoSlice = createSlice({
  name: PLAYER_PRIVATE_INFO_SLICE_PATH,
  initialState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const playerPrivateInfoActions = playerPrivateInfoSlice.actions;

export default playerPrivateInfoSlice.reducer;
