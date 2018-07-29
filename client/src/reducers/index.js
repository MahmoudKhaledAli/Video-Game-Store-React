import { combineReducers } from 'redux';

import { productsReducer, featuredReducer, currentProductReducer, searchReducer } from './productsReducer';
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { ordersReducer } from './ordersReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  featured: featuredReducer,
  currentProductId: currentProductReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: ordersReducer,
  searchIds: searchReducer
});

export default rootReducer;
