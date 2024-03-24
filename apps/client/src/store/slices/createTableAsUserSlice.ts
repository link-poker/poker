import { ICreateTableAsUserRequest, ITableResponse } from '@link-poker/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CREATE_TABLE_AS_USER_SLICE_PATH } from 'constants/slicePath';
import { getCreateTableAsUserUrl } from 'constants/url';
import { HttpService } from 'services/HttpService';

const httpService = new HttpService();

const initialState: ResponseState<{ table: ITableResponse }> = {
  status: 'IDLE',
};

export const createTableAsUser = createAsyncThunk(
  CREATE_TABLE_AS_USER_SLICE_PATH,
  async (request: ICreateTableAsUserRequest) => {
    const response = await httpService.post(getCreateTableAsUserUrl(), request.body);
    return response.data;
  },
);

const createTableAsUserSlice = createSlice({
  name: CREATE_TABLE_AS_USER_SLICE_PATH,
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
