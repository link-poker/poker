import { ISitDownAsGuestRequest, IPlayerPrivateInfoResponse, ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SIT_DOWN_AS_GUEST_SLICE_PATH } from 'constants/slicePath';
import { getSitDownAsGuestUrl } from 'constants/url';
import { HttpService } from 'services/HttpService';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse; playerPrivateInfo: IPlayerPrivateInfoResponse }> = {
  status: 'IDLE',
};

export const sitDownAsGuest = createAsyncThunk(
  SIT_DOWN_AS_GUEST_SLICE_PATH,
  async (request: ISitDownAsGuestRequest) => {
    const response = await httpService.post(getSitDownAsGuestUrl(request.params.tableId), request.body);
    return response.data;
  },
);

const sitDownAsGuestSlice = createSlice({
  name: SIT_DOWN_AS_GUEST_SLICE_PATH,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sitDownAsGuest.pending, state => {
        state.status = 'LOADING';
      })
      .addCase(sitDownAsGuest.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.response = action.payload;
      })
      .addCase(sitDownAsGuest.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default sitDownAsGuestSlice.reducer;
