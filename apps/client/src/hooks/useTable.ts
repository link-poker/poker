import { useSelector } from 'react-redux';
import { ICreateTableAsGuestRequest, ISitDownAsUserRequest } from 'interfaces/request/ITableHttpRequest';
import { AppState } from 'store';
import { createTableAsGuest } from 'store/slices/createTableAsGuestSlice';
import { tableActions } from 'store/slices/tableSlice';
import { userActions } from 'store/slices/userSlice';
import { useAppDispatch } from './useAppDispatch';
import { sitDownAsUser } from 'store/slices/sitDownAsUserSlice';

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
    }
    return response;
  };

  const sitDownAsUserAndUpdateState = async (request: ISitDownAsUserRequest) => {
    const response = await dispatch(sitDownAsUser(request));
    if (createTableAsGuest.fulfilled.match(response)) {
      dispatch(tableActions.update(response.payload.table));
      dispatch(userActions.update(response.payload.user));
    }
    return response;
  };

  return {
    table,
    createTableAsGuestState,
    sitDownAsUserState,
    createTableAsGuestAndUpdateState,
    sitDownAsUserAndUpdateState,
  };
};
