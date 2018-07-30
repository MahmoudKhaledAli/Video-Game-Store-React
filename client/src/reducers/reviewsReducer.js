import { FETCH_PRODUCT, ADD_REVIEW } from 'actions/types';
import _ from 'lodash';

export function reviewsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      if (action.payload[0].username) {
        return action.payload.map(review => _.pick(review, ['score', 'comment', 'username']));
      } else {
        return [];
      }

    case ADD_REVIEW:
      return [...state, _.pick(action.payload, ['score', 'comment', 'username'])];

    default:
      return state;
  }
}