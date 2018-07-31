const Admin = require('../controllers/admin');
const router = require('express').Router();

router.get('/products', Admin.productsList);
router.get('/products/:id', Admin.product);
router.post('/products', Admin.addProduct);
router.put('/products/:id', Admin.updateProduct);
router.delete('/products/:id', Admin.deleteProduct);

router.get('/users', Admin.usersList);
router.get('/users/:id', Admin.user);
router.post('/users/:id', Admin.updateUser);
router.delete('/users/:id', Admin.deleteUser);

router.get('/coupons', Admin.couponsList);
router.get('/coupons/:id', Admin.coupon);
router.post('/coupons', Admin.addCoupon);
router.put('/coupons/:id', Admin.updateCoupon);
router.delete('/coupons/:id', Admin.deleteCoupon);

router.get('/reviews', Admin.reviewsList);
router.get('/reviews/:id', Admin.review);
router.delete('/reviews/:id', Admin.deleteReview);

router.get('/orders', Admin.ordersList);
router.get('/orders/:id', Admin.order);
router.put('/orders/:id', Admin.updateOrder);
router.delete('/orders/:id', Admin.deleteOrder);

module.exports = router;