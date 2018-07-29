const Authentication = require('../controllers/authentication');
const Product = require('../controllers/product');
const passport = require('passport');
const router = require('express').Router();
require('../services/passport');

const requireSignin = passport.authenticate('local', { session: false });

router.post('/signup', Authentication.signup);
router.post('/signin', requireSignin, Authentication.fetchUserInfo);
router.post('/search', Product.productSearch);
router.get('/fetchfeatured', Product.fetchFeatured);

module.exports = router;