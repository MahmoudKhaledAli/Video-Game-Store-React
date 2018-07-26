const handlers = require('./request_handlers');

module.exports.route = app => {
    app.post('/addtocart', handlers.addToCart);
    app.post('/fetchcart', handlers.fetchCart);
}