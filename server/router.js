const Cart = require('./controllers/cart');
const Product = require('./controllers/product');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/addtocart', requireAuth, Cart.addToCart);
  app.post('/fetchcart', requireAuth, Cart.fetchCart);
  app.post('/search', Product.productSearch);
}