import { createSlice } from '@reduxjs/toolkit';
import { IUserResponse } from 'interfaces/response/IUserResponse';

const initialState: IUserResponse = {
  id: '',
  name: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
