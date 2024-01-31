import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { getUser } from 'store/slices/getUserSlice';
import { userActions } from 'store/slices/userSlice';
import { useAppDispatch } from './useAppDispatch';

export const useUser = () => {
  const user = useSelector((state: AppState) => state.user);
  const getUserState = useSelector((state: AppState) => state.getUser);
  const dispatch = useAppDispatch();

  const loadUser = async (userId: string) => {
    const response = await dispatch(getUser(userId));
    if (getUser.fulfilled.match(response)) {
      dispatch(userActions.update(response.payload.user));
    }
    return response;
  };

  return {
    user,
    getUserState,
    loadUser,
  };
};
