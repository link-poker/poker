import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateTableAsGuestRequest } from 'interfaces/request/ITableHttpRequest';
import { ITableResponse } from 'interfaces/response/ITableResponse';
import { IUserResponse } from 'interfaces/response/IUserResponse';
import { HttpService } from 'services/HttpService';
import { getCreateTableAsGuestUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ user: IUserResponse; table: ITableResponse }> = {
  status: 'idle',
  error: null,
  response: null,
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
        state.status = 'loading';
      })
      .addCase(createTableAsGuest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(createTableAsGuest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default createTableAsGuestSlice.reducer;
