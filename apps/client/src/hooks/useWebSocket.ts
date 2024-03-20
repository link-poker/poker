import { WebSocketMessageKindEnum } from '@link-poker/constants';
import { useDispatch } from 'react-redux';
import { playerPrivateInfoActions } from 'store/slices/playerPrivateInfoSlice';
import { tableActions } from 'store/slices/tableSlice';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const updateState = (message: string) => {
    const { kind, payload } = JSON.parse(message);
    switch (kind as WebSocketMessageKindEnum) {
      case 'ENTER':
        dispatch(tableActions.update(payload.table));
        break;
      case 'SIT_DOWN':
        dispatch(tableActions.update(payload.table));
        break;
      case 'DEAL_CARDS':
        dispatch(tableActions.update(payload.table));
        break;
      case 'STAND_UP':
        dispatch(tableActions.update(payload.table));
        break;
      case 'CALL':
        dispatch(tableActions.update(payload.table));
        break;
      case 'CHECK':
        dispatch(tableActions.update(payload.table));
        break;
      case 'FOLD':
        dispatch(tableActions.update(payload.table));
        break;
      case 'BET':
        dispatch(tableActions.update(payload.table));
        break;
      case 'RAISE':
        dispatch(tableActions.update(payload.table));
        break;
      case 'ADD_ON':
        dispatch(tableActions.update(payload.table));
        break;
      case 'DELAY_TIME':
        dispatch(tableActions.update(payload.table));
        break;
      case 'PLAYER_PRIVATE_INFO':
        dispatch(playerPrivateInfoActions.update(payload.playerPrivateInfo));
        break;
      default:
        break;
    }
  };
  return {
    updateState,
  };
};
