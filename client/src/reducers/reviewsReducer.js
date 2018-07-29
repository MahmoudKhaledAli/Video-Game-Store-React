import { FETCH_PRODUCT } from 'actions/types';
import _ from 'lodash';

export function reviewsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload.map(review => _.pick(review, ['score', 'comment', 'username']));

    default:
      return state;
  }
}