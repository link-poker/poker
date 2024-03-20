import { ITableLogResponse } from '@link-poker/constants';
import { createSlice } from '@reduxjs/toolkit';

export const initialTableLogsState: ITableLogResponse[] = [];

const tableLogsSlice = createSlice({
  name: 'tableLogs',
  initialState: initialTableLogsState,
  reducers: { update: (state, action) => (state = action.payload) },
});

export const tableLogsActions = tableLogsSlice.actions;

export default tableLogsSlice.reducer;
