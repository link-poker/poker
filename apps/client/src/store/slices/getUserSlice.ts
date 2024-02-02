import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserResponse } from 'interfaces/response/IUserResponse';
import { HttpService } from 'services/HttpService';
import { getUserUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ user: IUserResponse }> = {
  status: 'idle',
  error: null,
  response: null,
};

export const getUser = createAsyncThunk('gatUser', async (tableId: string) => {
  const response = await httpService.get(getUserUrl(tableId));
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