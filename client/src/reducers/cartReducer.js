import { ADD_TO_CART } from 'actions/types';
import _ from 'lodash';

export function cartReducer(state = { cartItems: [], total: 0 }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartItems: [...state.cartItems, _.omit(action.payload, 'product')],
        total: state.total + action.payload.final_price
      }

    default:
      return state;
  }
}