import { IUserResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserUrl } from 'constants/url';
import { HttpService } from 'services/HttpService';

const httpService = new HttpService();

const initialState: ResponseState<{ user: IUserResponse }> = {
  status: 'IDLE',
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
        state.status = 'LOADING';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.response = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default getUserSlice.reducer;
