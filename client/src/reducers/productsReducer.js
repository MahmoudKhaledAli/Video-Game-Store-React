import _ from 'lodash';

import { ADD_TO_CART, FETCH_CART, FETCH_FEATURED, SEARCH } from 'actions/types';

const INITIAL_STATE = {};

export function productsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let newProduct = {};
      newProduct[action.payload.idproduct] = action.payload.product;
      return { ...state, ...newProduct }

    case FETCH_CART:
      const newProducts = action.payload.map(cartItem => {
        let newProduct = {};
        newProduct[cartItem.idproduct] = cartItem.product;
        return newProduct;
      });
      return Object.assign({}, state, ...newProducts);

    case FETCH_FEATURED:
      return {
        ...state,
        ..._.mapKeys(action.payload.topSellers, 'idproduct'),
        ..._.mapKeys(action.payload.highestRated, 'idproduct')
      }

    case SEARCH:
      return { ...state, ..._.mapKeys(action.payload.products, 'idproduct') };

    default:
      return state;
  }
}

export function currentProductReducer(state = null, action) {
  return 1;
}

export function featuredReducer(state = { topSellersIds: [], highestRatedIds: [] }, action) {
  switch (action.type) {
    case FETCH_FEATURED:
      return {
        topSellersIds: action.payload.topSellers.map(product => product.idproduct),
        highestRatedIds: action.payload.highestRated.map(product => product.idproduct)
      };

    default:
      return state;
  }
  // return {
  //   topSellersIds: [1, 2],
  //   highestRatedIds: [2, 3]
  // };
}

export function searchReducer(state = [], action) {
  switch (action.type) {
    case SEARCH:
      console.log(action.payload);

      if (action.payload.products) {
        return action.payload.products.map(product => product.idproduct);
      } else {
        return [];
      }

    default:
      return state;
  }
}