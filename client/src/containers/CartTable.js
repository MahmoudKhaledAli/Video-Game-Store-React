import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';

import { CartSelector } from 'selectors';
import { CartItem } from 'containers';

class CartTable extends Component {
  renderWithLayout(cart) {
    return (
      <div className="row">
        <div className="col-lg-12">
          {cart}
        </div>
      </div>
    );
  }

  render() {
    const { cartItems } = this.props;
    
    if (cartItems === 0) {
      return this.renderWithLayout(<h1 align="center">Loading...</h1>);
    }

    if (_.isEmpty(cartItems)) {
      return this.renderWithLayout(<h1 align="center">Your cart is empty!</h1>);
    }

    const cartJSX = (
      <div className="col-lg-12">
        <br />
        <br />
        <div className="main-box no-header clearfix">
          <div className="main-box-body clearfix">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th><span>Name</span></th>
                    <th><span>Platform</span></th>
                    <th><span>Quantity</span></th>
                    <th><span>Unit Price</span></th>
                    <th><span>Sale %</span></th>
                    <th><span>Total</span></th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(cartItems, cartItem => <CartItem key={cartItem.idproduct} cartItem={cartItem} platforms={this.props.platforms} />)}
                </tbody>
              </table>
            </div>
          </div >
        </div >
      </div>
    );

    return this.renderWithLayout(cartJSX);
  }
}

function mapStateToProps(state) {
  return {
    cartItems: CartSelector(state),
  }
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(CartTable);