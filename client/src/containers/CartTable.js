import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { cartItems, total } = this.props;

    if (cartItems.length === 0) {
      return this.renderWithLayout(<h1 align="center">Your cart is empty!</h1>);
    }

    const cartJSX = (
      <div className="row">
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
                    {_.map(cartItems, cartItem => <CartItem cartItem={cartItem} />)}
                  </tbody>
                </table>
              </div>
            </div >
          </div >
          <div className="pull-right">
            <h2>Total: {total}</h2>
            <h2>Coupon</h2>
            <form>
              <div className="text-left form-group">
                <input style={{ width: '53%' }} type="text" className="form-control input-lg" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg">Place Order</button>
            </form>
          </div>
        </div>
      </div >
    );

    return this.renderWithLayout(cartJSX);
  }
}

function mapStateToProps(state) {
  return {
    cartItems: CartSelector(state),
    total: state.total
  }
}

export default connect(mapStateToProps)(CartTable);