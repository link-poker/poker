import { useSelector } from 'react-redux';
import { AppState } from 'store';

export const usePlayerPrivateInfo = () => {
  const playerPrivateInfo = useSelector((state: AppState) => state.playerPrivateInfo);

  return {
    playerPrivateInfo,
  };
};
