import React from 'react';

import { Helmet } from 'react-helmet';

import { CartTable, Checkout } from 'containers'
import { requireAuth } from 'components';
import { platforms } from 'utilities';

export default requireAuth()(() => {
  return (
    <div>
      <Helmet>
        <title>Video Game Store - Cart</title>
      </Helmet>
      <div className="row">
        <CartTable platforms={platforms} />
        <Checkout />
      </div>
    </div>
  );
});