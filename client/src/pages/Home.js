import React from 'react';

import { Helmet } from 'react-helmet';

import { Jumbotron } from 'components';
import { TopSellers, HighestRated } from 'containers';

export default () => {
  return (
    <div>
      <Helmet>
        <title>Video Game Store</title>
      </Helmet>
      <Jumbotron />
      <TopSellers />
      <HighestRated />
    </div>
  );
}