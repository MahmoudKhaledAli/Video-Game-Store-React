import { combineReducers } from 'redux';

import { productsReducer, featuredReducer, currentProductReducer, searchReducer } from './productsReducer';
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { ordersReducer } from './ordersReducer';
import { reviewsReducer } from './reviewsReducer';
import { errorsReducer } from './errorsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  featured: featuredReducer,
  currentProductId: currentProductReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: ordersReducer,
  searchIds: searchReducer,
  reviews: reviewsReducer,
  errors: errorsReducer
});

export default rootReducer;
