import { UPDATE_USER } from '../actions/userActions';

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: {},
};

export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
