import React from 'react';

import { Helmet } from 'react-helmet';

import { BrowseList, SearchForm } from 'containers';

export default () => {
  return (
    <div>
      <Helmet>
        <title>Video Game Store - Browse Products</title>
      </Helmet>
      <div className="row">
        <div className="col-lg-3">
          <SearchForm />
        </div>
        <div className="col-lg-9">
          <div align='center' style={{ marginBottom: "30px" }}>
            <br />
          </div>
          <BrowseList />
        </div>
      </div>
    </div>
  );
}