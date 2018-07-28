import React from 'react';

import { Helmet } from 'react-helmet';

import { UpdateAddress, UserOrderList } from 'containers'
import { requireAuth } from 'components';
import { orderStatus } from 'utilities';

export default requireAuth()(() => {
  return (
    <div>
      <Helmet>
        <title>Video Game Store - Account</title>
      </Helmet>
      <div className="row container">
        <UpdateAddress />
        <UserOrderList orderStatus={orderStatus} />
      </div>
    </div>
  );
});