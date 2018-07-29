import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AddToCartButton } from 'containers';

import 'styles/style.css';

class ProductShow extends Component {
  render() {
    const { product, gridSize } = this.props;

    return (
      <div className={`col-lg-${gridSize} col-md-6 mb-4 product`}>
        <div className="card">
          <Link to={`product/${product.idproduct}`}>
            <img className="card-img-top" src={product.imgpath} alt="" width="150" height="180" />
          </Link>
          <div className="card-body">
            <h4 className="card-title product-title">
              <Link to={`product/${product.idproduct}`}>{product.name.slice(0, 21)}</Link>
            </h4>
            <h4 className="card-subtitle mb-2 text-muted">{product.price} EGP</h4>
            <AddToCartButton idproduct={product.idproduct} quantity="1" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductShow;