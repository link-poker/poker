import { UPDATE_TABLE } from '../actions/tableActions';

interface TableState {
  table: any;
}

const initialState: TableState = {
  table: {},
};

export const tableReducer = (state = initialState, action: any): TableState => {
  switch (action.type) {
    case UPDATE_TABLE:
      return {
        ...state,
        table: action.payload,
      };
    default:
      return state;
  }
};
