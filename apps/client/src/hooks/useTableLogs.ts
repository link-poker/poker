import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { getTableLogs } from 'store/slices/getTableLogsSlice';
import { tableLogsActions } from 'store/slices/tableLogsSlice';
import { useAppDispatch } from './useAppDispatch';

export const useTableLogs = () => {
  const tableLogs = useSelector((state: AppState) => state.tableLogs);
  const getTableLogsState = useSelector((state: AppState) => state.getTableLogs);
  const dispatch = useAppDispatch();

  const loadTableLogs = async (tableId: string) => {
    const response = await dispatch(getTableLogs(tableId));
    if (getTableLogs.fulfilled.match(response)) {
      dispatch(tableLogsActions.update(response.payload.tableLogs));
    }
    return response;
  };

  return {
    tableLogs,
    getTableLogsState,
    loadTableLogs,
  };
};
