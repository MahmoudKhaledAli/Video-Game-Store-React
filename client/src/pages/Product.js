import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import { ProductDetail } from 'components';
import { ReviewForm } from 'containers'
import { platforms } from 'utilities';

class Product extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{`Video Game Store - ${this.props.product.title}`}</title>
        </Helmet>
        <ProductDetail product={this.props.product} platforms={platforms} />
        <div style={{ marginTop: '60px' }}>
          <ReviewForm />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ products }, ownProps) {
  return { product: products[ownProps.match.params.id] };
}

export default connect(mapStateToProps)(Product);