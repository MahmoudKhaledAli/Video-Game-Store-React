const User = require('../controllers/user');
const Authentication = require('../controllers/authentication');
const Cart = require('../controllers/cart');
const passport = require('passport');
const router = require('express').Router();
require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.use(requireAuth);
router.get('/fetchuserinfo', Authentication.fetchUserInfo);
router.post('/updateaddress', User.updateAddress);
router.post('/addtocart', Cart.addToCart);
router.get('/fetchcart', Cart.fetchCart);
router.post('/checkout', Cart.checkout);

module.exports = router;