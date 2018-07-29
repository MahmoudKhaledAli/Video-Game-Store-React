import { AUTH_ERROR, ADD_TO_CART_ERROR, CHECKOUT_ERROR } from 'actions/types';

const INITIAL_STATE = {
  auth: '',
  addToCart: '',
  checkout: ''
};

export function errorsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return { ...state, auth: action.payload };

    case ADD_TO_CART_ERROR:
      return { ...state, addToCart: action.payload };

    case CHECKOUT_ERROR:
      return { ...state, checkout: action.payload };

    default:
      return state;
  }

}