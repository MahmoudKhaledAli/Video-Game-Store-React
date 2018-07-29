import { ADD_TO_CART, FETCH_CART, DELETE_CART_ITEM, CHECKOUT } from 'actions/types';
import _ from 'lodash';

export function cartReducer(state = { cartItems: {}, total: 0 }, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cartItems: { ...state.cartItems, ..._.mapKeys([_.omit(action.payload, 'product')], 'idproduct') },
        total: state.total + action.payload.final_price
      }

    case FETCH_CART:
      return {
        cartItems: _.mapKeys(_.map(action.payload.cartItems, cartItem => _.omit(cartItem, 'product')), 'idproduct'),
        total: action.payload.total
      }

    case DELETE_CART_ITEM:
      return {
        cartItems: _.omit(state.cartItems, action.payload.idproduct),
        total: state.total - action.payload.final_price
      }

    case CHECKOUT:
      return {
        cartItems: {},
        total: 0
      }

    default:
      return state;
  }
}