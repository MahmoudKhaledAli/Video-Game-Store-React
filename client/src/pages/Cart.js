import React from 'react';

import { Helmet } from 'react-helmet';

import { CartTable } from 'containers'
import { requireAuth } from 'components';

export default requireAuth()(() => {
  return (
    <div>
      <Helmet>
        <title>Video Game Store - Cart</title>
      </Helmet>
      <CartTable />
    </div>
  );
});