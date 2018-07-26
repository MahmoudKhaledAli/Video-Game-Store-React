import React, { Component } from 'react';
import _ from 'lodash';

import { ProductShow } from 'components';

import 'styles/style.css'

class ProductsList extends Component {
  renderProduct(product) {
    return <ProductShow key={product.idproduct} product={product} gridSize={this.props.gridSize} />;
  }

  render() {
    return (
      <div className="col-lg-12 div-center div-margin">
        {_.map(this.props.products, this.renderProduct.bind(this))}
      </div>
    );
  }
}

export default ProductsList;