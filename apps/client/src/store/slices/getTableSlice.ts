import { ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_TABLE_SLICE_PATH } from 'constants/slicePath';
import { getTableUrl } from 'constants/url';
import { HttpService } from 'services/HttpService';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse }> = {
  status: 'IDLE',
};

export const getTable = createAsyncThunk(GET_TABLE_SLICE_PATH, async (tableId: string) => {
  const response = await httpService.get(getTableUrl(tableId));
  return response.data;
});

const getTableSlice = createSlice({
  name: GET_TABLE_SLICE_PATH,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTable.pending, state => {
        state.status = 'LOADING';
      })
      .addCase(getTable.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.response = action.payload;
      })
      .addCase(getTable.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default getTableSlice.reducer;
