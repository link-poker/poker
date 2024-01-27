import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSitDownAsUserPath } from 'utils/path';
import { ITableResponse } from 'interfaces/response/ITableResponse';
import { IPlayerPrivateInfoResponse } from 'interfaces/response/IPlayerPrivateInfoResponse';
import { ISitDownAsUserRequest } from 'interfaces/request/ITableHttpRequest';
import { HttpService } from 'services/HttpService';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse; playerPrivateInfo: IPlayerPrivateInfoResponse }> = {
  status: 'idle',
  error: null,
  response: null,
};

export const sitDownAsUser = createAsyncThunk('sitDownAsUser', async (request: ISitDownAsUserRequest) => {
  const response = await httpService.post(getSitDownAsUserPath(request.params.tableId), request.body);
  return response.data;
});

const sitDownAsUserSlice = createSlice({
  name: 'sitDownAsUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sitDownAsUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(sitDownAsUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(sitDownAsUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default sitDownAsUserSlice.reducer;
