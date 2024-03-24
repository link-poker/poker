import { ICreateTableAsGuestRequest, ITableResponse, IUserResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from 'services/HttpService';
import { getCreateTableAsGuestUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ user: IUserResponse; table: ITableResponse }> = {
  status: 'IDLE',
};

export const createTableAsGuest = createAsyncThunk(
  'createTableAsGuest',
  async (request: ICreateTableAsGuestRequest) => {
    const response = await httpService.post(getCreateTableAsGuestUrl(), request.body);
    return response.data;
  },
);

const createTableAsGuestSlice = createSlice({
  name: 'createTableAsGuest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTableAsGuest.pending, state => {
        state.status = 'LOADING';
      })
      .addCase(createTableAsGuest.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.response = action.payload;
      })
      .addCase(createTableAsGuest.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default createTableAsGuestSlice.reducer;
