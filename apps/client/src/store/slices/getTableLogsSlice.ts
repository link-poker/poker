import { ITableLogResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from 'services/HttpService';
import { getTableLogsUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ tableLogs: ITableLogResponse[] }> = {
  status: 'IDLE',
};

export const getTableLogs = createAsyncThunk('gatTableLogs', async (userId: string) => {
  const response = await httpService.get(getTableLogsUrl(userId));
  return response.data;
});

const getTableLogsSlice = createSlice({
  name: 'getTableLogs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTableLogs.pending, state => {
        state.status = 'LOADING';
      })
      .addCase(getTableLogs.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.response = action.payload;
      })
      .addCase(getTableLogs.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default getTableLogsSlice.reducer;
