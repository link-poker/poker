import { useDispatch } from 'react-redux';
import { tableActions } from 'store/slices/tableSlice';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const updateState = (message: string) => {
    const { type, payload } = JSON.parse(message);
    switch (type) {
      case 'enter':
        dispatch(tableActions.update(payload.table));
        break;
      case 'sitDown':
        dispatch(tableActions.update(payload.table));
        break;
      case 'dealCards':
        dispatch(tableActions.update(payload.table));
        break;
      case 'standUp':
        dispatch(tableActions.update(payload.table));
        break;
      case 'call':
        dispatch(tableActions.update(payload.table));
        break;
      case 'check':
        dispatch(tableActions.update(payload.table));
        break;
      case 'fold':
        dispatch(tableActions.update(payload.table));
        break;
      case 'bet':
        dispatch(tableActions.update(payload.table));
        break;
      case 'raise':
        dispatch(tableActions.update(payload.table));
        break;
      case 'addOn':
        dispatch(tableActions.update(payload.table));
        break;
      case 'delayTime':
        dispatch(tableActions.update(payload.table));
        break;
      default:
        break;
    }
  };
  return {
    updateState,
  };
};
