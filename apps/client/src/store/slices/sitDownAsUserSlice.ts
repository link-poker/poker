import { ISitDownAsUserRequest, IPlayerPrivateInfoResponse, ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSitDownAsUserUrl } from 'constants/url';
import { HttpService } from 'services/HttpService';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse; playerPrivateInfo: IPlayerPrivateInfoResponse }> = {
  status: 'IDLE',
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
        state.status = 'LOADING';
      })
      .addCase(sitDownAsUser.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.response = action.payload;
      })
      .addCase(sitDownAsUser.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default sitDownAsUserSlice.reducer;
