import { createSelector } from 'reselect';

const productsSelector = state => state.products;
const topSellersSelector = state => state.featured.topSellersIds;
const highestRatedSelector = state => state.featured.highestRatedIds;


const getFeaturedProducts = (products, featuredIds) => {
  return featuredIds.map(Id => products[Id]);
}

export const TopSellersSelector = createSelector(productsSelector, topSellersSelector, getFeaturedProducts);
export const HighestRatedSelector = createSelector(productsSelector, highestRatedSelector, getFeaturedProducts);