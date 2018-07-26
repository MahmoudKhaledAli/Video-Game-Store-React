import React from 'react';

import { Helmet } from 'react-helmet';

import { CartTable } from 'containers'

export default () => {
  return (
    <div>
      <Helmet>
        <title>Video Game Store - Cart</title>
      </Helmet>
      <CartTable />
    </div>
  );
}