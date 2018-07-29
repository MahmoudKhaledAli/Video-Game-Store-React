import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import { ProductDetail } from 'components';
import { ReviewForm, AddToCart } from 'containers';
import { fetchProduct } from 'actions';
import { platforms } from 'utilities';

class Product extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    if (!this.props.product) {
      return (
        <div className="row div-margin">
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>{`Video Game Store - ${this.props.product.name}`}</title>
        </Helmet>
        <div className="row div-margin">
          <ProductDetail product={this.props.product} reviews={this.props.reviews} platforms={platforms}>
            <AddToCart productId={this.props.product.idproduct} />
          </ProductDetail>
        </div>
        <div className="row div-margin">
          <div>
            <ReviewForm productId={this.props.product.idproduct} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ products, reviews }, ownProps) {
  return {
    product: products[ownProps.match.params.id],
    reviews
  };
}

export default connect(mapStateToProps, { fetchProduct })(Product);