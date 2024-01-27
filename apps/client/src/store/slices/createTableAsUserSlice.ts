import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateTableAsUserRequest } from 'interfaces/request/ITableHttpRequest';
import { ITableResponse } from 'interfaces/response/ITableResponse';
import { HttpService } from 'services/HttpService';
import { getCreateTableAsUserUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse }> = {
  status: 'idle',
  error: null,
  response: null,
};

export const createTableAsUser = createAsyncThunk('createTableAsUser', async (request: ICreateTableAsUserRequest) => {
  const response = await httpService.post(getCreateTableAsUserUrl(), request.body);
  return response.data;
});

const createTableAsUserSlice = createSlice({
  name: 'createTableAsUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTableAsUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(createTableAsUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(createTableAsUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default createTableAsUserSlice.reducer;
