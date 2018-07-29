import { AUTH_ERROR, ADD_TO_CART_ERROR } from 'actions/types';

const INITIAL_STATE = {
  auth: '',
  addToCart: ''
};

export function errorsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return { ...state, auth: action.payload };

    case ADD_TO_CART_ERROR:
      return { ...state, addToCart: action.payload };

    default:
      return state;
  }

}