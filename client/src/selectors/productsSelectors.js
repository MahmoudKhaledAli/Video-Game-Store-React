import { createSelector } from 'reselect';

const productsSelector = state => state.products;
const topSellersSelector = state => state.featured.topSellersIds;
const highestRatedSelector = state => state.featured.highestRatedIds;
const searchResultsSelector = state => state.searchIds;

const getProducts = (products, Ids) => {
  return Ids.map(Id => products[Id]);
}

export const TopSellersSelector = createSelector(productsSelector, topSellersSelector, getProducts);
export const HighestRatedSelector = createSelector(productsSelector, highestRatedSelector, getProducts);
export const SearchResultsSelector = createSelector(productsSelector, searchResultsSelector, getProducts);