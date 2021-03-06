import React, { Component } from 'react';
import _ from 'lodash';

import { ProductShow } from 'components';

import 'styles/style.css'

export default class extends Component {
  renderProduct(product) {
    return <ProductShow key={product.idproduct} product={product} gridSize={this.props.gridSize} />;
  }

  render() {
    if (!this.props.products.length) {
      return (
        <div className="col-lg-12 div-center div-margin">
          <h2>No matching products</h2>
        </div>
      );
    }
    return (
      <div className="col-lg-12 div-center div-margin">
        {_.map(this.props.products, this.renderProduct.bind(this))}
      </div>
    );
  }
}