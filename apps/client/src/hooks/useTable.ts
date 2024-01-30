import { useSelector } from 'react-redux';
import { ICreateTableAsGuestRequest, ISitDownAsUserRequest } from 'interfaces/request/ITableHttpRequest';
import { AppState } from 'store';
import { createTableAsGuest } from 'store/slices/createTableAsGuestSlice';
import { getTable } from 'store/slices/getTableSlice';
import { sitDownAsUser } from 'store/slices/sitDownAsUserSlice';
import { tableActions } from 'store/slices/tableSlice';
import { userActions } from 'store/slices/userSlice';
import { setAuthInfo } from 'utils/authInfo';
import { useAppDispatch } from './useAppDispatch';

export const useTable = () => {
  const table = useSelector((state: AppState) => state.table);
  const createTableAsGuestState = useSelector((state: AppState) => state.createTableAsGuest);
  const sitDownAsUserState = useSelector((state: AppState) => state.sitDownAsUser);
  const dispatch = useAppDispatch();

  const createTableAsGuestAndUpdateState = async (request: ICreateTableAsGuestRequest) => {
    const response = await dispatch(createTableAsGuest(request));
    if (createTableAsGuest.fulfilled.match(response)) {
      dispatch(tableActions.update(response.payload.table));
      dispatch(userActions.update(response.payload.user));
      setAuthInfo({
        userId: response.payload.user.id,
        authToken: response.payload.authToken.authToken,
      });
    }
    return response;
  };

  const sitDownAsUserAndUpdateState = async (request: ISitDownAsUserRequest) => {
    const response = await dispatch(sitDownAsUser(request));
    if (sitDownAsUser.fulfilled.match(response)) {
      dispatch(tableActions.update(response.payload.table));
      dispatch(userActions.update(response.payload.user));
    }
    return response;
  };

  const loadTable = async (tableId: string) => {
    const response = await dispatch(getTable(tableId));
    if (getTable.fulfilled.match(response)) {
      dispatch(tableActions.update(response.payload.table));
    }
    return response;
  };

  return {
    table,
    createTableAsGuestState,
    sitDownAsUserState,
    createTableAsGuestAndUpdateState,
    sitDownAsUserAndUpdateState,
    loadTable,
  };
};
