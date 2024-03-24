import { ITableLogResponse } from '@link-poker/constants';
import { createSlice } from '@reduxjs/toolkit';
import { TABLE_LOGS_SLICE_PATH } from 'constants/slicePath';

export const initialTableLogsState: ITableLogResponse[] = [];

const tableLogsSlice = createSlice({
  name: TABLE_LOGS_SLICE_PATH,
  initialState: initialTableLogsState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const tableLogsActions = tableLogsSlice.actions;

export default tableLogsSlice.reducer;
