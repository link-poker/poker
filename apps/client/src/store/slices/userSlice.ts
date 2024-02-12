import { IUserResponse } from '@link-poker/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialUserState: IUserResponse = {
  id: '',
  name: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
