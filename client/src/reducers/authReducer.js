import { AUTH_USER, UPDATE_ADDRESS } from 'actions/types';

const INITIAL_STATE = {
  authenticated: '',
  username: '',
  address: '',
};

export function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
    if (action.payload.username) {
      
    }
      return {
        ...state,
        authenticated: action.payload.token,
        username: action.payload.username,
        address: action.payload.address
      };

    case UPDATE_ADDRESS:
      return { ...state, address: action.payload.address };

    default:
      return state;
  }
}