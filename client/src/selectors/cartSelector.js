import _ from 'lodash';

import { createSelector } from 'reselect';

const productsSelector = state => state.products;
const cartSelector = state => state.cart.cartItems;


const getCartProducts = (products, cartItems) => {
  return _.map(cartItems, cartItem => {
    return {
      product: products[cartItem.idproduct],
      ...cartItem
    };
  });
}

export const CartSelector = createSelector(productsSelector, cartSelector, getCartProducts);