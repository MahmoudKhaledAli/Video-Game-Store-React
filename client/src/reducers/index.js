import { combineReducers } from 'redux';

import { productsReducer, featuredReducer, currentProductReducer } from './productsReducer';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  featured: featuredReducer,
  currentProductId: currentProductReducer,
  cart: cartReducer
});

export default rootReducer;
