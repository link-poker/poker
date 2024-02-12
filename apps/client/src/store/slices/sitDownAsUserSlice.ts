import { ISitDownAsUserRequest, IPlayerPrivateInfoResponse, ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from 'services/HttpService';
import { getSitDownAsUserUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse; playerPrivateInfo: IPlayerPrivateInfoResponse }> = {
  status: 'idle',
  error: null,
  response: null,
};

export const sitDownAsUser = createAsyncThunk('sitDownAsUser', async (request: ISitDownAsUserRequest) => {
  const response = await httpService.post(getSitDownAsUserUrl(request.params.tableId), request.body);
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
