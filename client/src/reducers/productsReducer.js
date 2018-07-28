import { ADD_TO_CART, FETCH_CART } from 'actions/types';

const url1 = 'https://im.ziffdavisinternational.com/ign_me/screenshot/f/fifa-13-adds-ksa-league-teams-features-abdullaziz/fifa-13-adds-ksa-league-teams-features-abdullaziz_7gww.jpg'
const url2 = 'https://vignette.wikia.nocookie.net/injusticegodsamongus/images/1/10/Injustice_2_Ultimate_Edition_PS4_cover.jpg/revision/latest?cb=20170124010821'
const url3 = 'https://www.cosmicbooknews.com/sites/default/files/spider-man-ps4-box-art.jpg'
const products = {
  1: {
    imgpath: url1, idproduct: 1, name: 'FIFA 13', price: 100, description: 'The best game in the whole world', avg_score: 4, platform: 0, stock: 5, sale: 100
  },
  2: {
    imgpath: url2, idproduct: 2, name: 'Injustice 2', price: 400, description: 'The best game in the whole world 2', avg_score: 4, platform: 0, stock: 5, sale: 100
  },
  3: {
    imgpath: url3, idproduct: 3, name: 'Spider-man', price: 600, description: 'The best game in the whole world 3', avg_score: 4, platform: 0, stock: 5, sale: 100
  }
};

const INITIAL_STATE = products;

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


    default:
      return state;
  }
}

export function currentProductReducer(state = null, action) {
  return 1;
}

export function featuredReducer(state = {}, action) {
  return {
    topSellersIds: [1, 2],
    highestRatedIds: [2, 3]
  };
}