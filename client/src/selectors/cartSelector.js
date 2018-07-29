import _ from 'lodash';

import { createSelector } from 'reselect';

const productsSelector = state => state.products;
const cartSelector = state => state.cart.cartItems;


const getCartProducts = (products, cartItems) => {
  const cartArray =  _.map(cartItems, cartItem => {
    return {
      product: products[cartItem.idproduct],
      ...cartItem
    };
  });

  return _.mapKeys(cartArray, 'idproduct');
}

export const CartSelector = createSelector(productsSelector, cartSelector, getCartProducts);