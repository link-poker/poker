import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store';
import { updateUser } from '../store/actions/userActions';

export const useUser = () => {
  const user = useSelector((state: AppState) => state.user.user);
  const dispatch = useDispatch();

  const updateUserData = (data: any) => {
    dispatch(updateUser(data));
  };

  return {
    user,
    updateUserData,
  };
};
