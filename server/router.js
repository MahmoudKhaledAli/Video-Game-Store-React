const Cart = require('./controllers/cart');
const Product = require('./controllers/product');

module.exports = app => {
    app.post('/addtocart', Cart.addToCart);
    app.post('/fetchcart', Cart.fetchCart);
    app.post('/search', Product.productSearch);
}