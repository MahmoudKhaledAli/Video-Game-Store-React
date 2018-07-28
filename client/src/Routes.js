import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Browse, Product, Cart, Account } from 'pages';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/account" component={Account} />
    </Switch>
  );
};