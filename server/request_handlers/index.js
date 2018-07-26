var product = require('./product.js')
var cart = require('./cart');

module.exports = {
  addToCart: cart.addToCart,
  fetchCart: cart.fetchCart,
  productSearch: product.productSearch
}
