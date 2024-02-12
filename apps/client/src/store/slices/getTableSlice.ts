import { ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from 'services/HttpService';
import { getTableUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse }> = {
  status: 'idle',
  error: null,
  response: null,
};

export const getTable = createAsyncThunk('gatTable', async (tableId: string) => {
  const response = await httpService.get(getTableUrl(tableId));
  return response.data;
});

const getTableSlice = createSlice({
  name: 'getTable',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTable.pending, state => {
        state.status = 'loading';
      })
      .addCase(getTable.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(getTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default getTableSlice.reducer;
