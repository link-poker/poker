import { ISitDownAsGuestRequest, IPlayerPrivateInfoResponse, ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from 'services/HttpService';
import { getSitDownAsGuestUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse; playerPrivateInfo: IPlayerPrivateInfoResponse }> = {
  status: 'idle',
  error: null,
  response: null,
};

export const sitDownAsGuest = createAsyncThunk('sitDownAsGuest', async (request: ISitDownAsGuestRequest) => {
  const response = await httpService.post(getSitDownAsGuestUrl(request.params.tableId), request.body);
  return response.data;
});

const sitDownAsGuestSlice = createSlice({
  name: 'sitDownAsGuest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sitDownAsGuest.pending, state => {
        state.status = 'loading';
      })
      .addCase(sitDownAsGuest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(sitDownAsGuest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default sitDownAsGuestSlice.reducer;
