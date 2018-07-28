import { AUTH_USER, AUTH_ERROR, UPDATE_ADDRESS } from 'actions/types';

const INITIAL_STATE = {
  authenticated: '',
  username: '',
  address: '',
  errorMessage: ''
};

export function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
    if (action.payload.username) {
      
    }
      return {
        ...state,
        errorMessage: '',
        authenticated: action.payload.token,
        username: action.payload.username,
        address: action.payload.address
      };

    case AUTH_ERROR:
      localStorage.removeItem('token');
      return { errorMessage: action.payload };

    case UPDATE_ADDRESS:
      return { ...state, address: action.payload.address };

    default:
      return state;
  }
}