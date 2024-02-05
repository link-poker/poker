import { useDispatch } from 'react-redux';
import { MessageTypeEnum } from 'configs/websocket';
import { playerPrivateInfoActions } from 'store/slices/playerPrivateInfoSlice';
import { tableActions } from 'store/slices/tableSlice';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const updateState = (message: string) => {
    const { type, payload } = JSON.parse(message);
    switch (type) {
      case MessageTypeEnum.ENTER:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.SIT_DOWN:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.DEAL_CARDS:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.STAND_UP:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.CALL:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.CHECK:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.FOLD:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.BET:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.RAISE:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.ADD_ON:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.DELAY_TIME:
        dispatch(tableActions.update(payload.table));
        break;
      case MessageTypeEnum.PLAYER_PRIVATE_INFO:
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
