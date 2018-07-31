import { FETCH_ORDERS, DELETE_ORDER } from 'actions/types';
import _ from 'lodash';

export function ordersReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return _.mapKeys(action.payload.orders, 'idorder');

    case DELETE_ORDER:
    return _.omit(state, action.payload.idorder)

    default:
      return state;
  }
}