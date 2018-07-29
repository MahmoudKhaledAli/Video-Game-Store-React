import { ADD_TO_CART } from 'actions/types';
import _ from 'lodash';

const defaultState = {
  cartItems: [{
    idproduct: 1,
    quantity: 5,
    final_price: 500,
  }],
  total: 0
}

export function cartReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_TO_CART:
    console.log(action.payload);
    
      return {
        cartItems: [...state.cartItems, _.omit(action.payload, 'product')],
        total: state.total + action.payload.final_price
      }

    default:
      return state;
  }
}