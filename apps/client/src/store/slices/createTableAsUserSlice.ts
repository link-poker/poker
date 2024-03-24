import { ICreateTableAsUserRequest, ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from 'services/HttpService';
import { getCreateTableAsUserUrl } from 'utils/url';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse }> = {
  status: 'IDLE',
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
        state.status = 'LOADING';
      })
      .addCase(createTableAsUser.fulfilled, (state, action) => {
        state.status = 'SUCCEEDED';
        state.response = action.payload;
      })
      .addCase(createTableAsUser.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default createTableAsUserSlice.reducer;
