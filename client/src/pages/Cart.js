import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Helmet } from 'react-helmet';

import { CartTable, Checkout } from 'containers'
import { requireAuth } from 'components';
import { fetchCart } from 'actions';
import { platforms } from 'utilities';

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
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
  }
}

const enhance = compose(
  connect(null, { fetchCart }),
  requireAuth()
);

export default enhance(Cart);