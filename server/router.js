const Cart = require('./controllers/cart');
const Product = require('./controllers/product');
const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const passport = require('passport');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.fetchUserInfo);
  app.get('/fetchuserinfo', requireAuth, Authentication.fetchUserInfo);
  app.post('/updateaddress', requireAuth, User.updateAddress);
  app.post('/addtocart', requireAuth, Cart.addToCart);
  app.get('/fetchcart', requireAuth, Cart.fetchCart);
  app.post('/checkout', requireAuth, Cart.checkout);
  app.post('/search', Product.productSearch);
}