import { IUserResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from 'services/HttpService';
import { getUserUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ user: IUserResponse }> = {
  status: 'idle',
  error: null,
  response: null,
};

export const getUser = createAsyncThunk('gatUser', async (userId: string) => {
  const response = await httpService.get(getUserUrl(userId));
  return response.data;
});

const getUserSlice = createSlice({
  name: 'getUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default getUserSlice.reducer;
