import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { updateTable } from '../store/actions/tableActions';

export const useTable = () => {
  const table = useSelector((state: AppState) => state.table.table);
  const dispatch = useDispatch();

  const updateTableData = (data: any) => {
    dispatch(updateTable(data));
  };

  return {
    table,
    updateTableData,
  };
};
