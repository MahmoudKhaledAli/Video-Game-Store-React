import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Button } from 'react-bootstrap';

class Checkout extends Component {
  render() {
    const { cartItems, total } = this.props;

    if (cartItems) {
      return (
        <div className="pull-right">
          <h2>Total: {total}</h2>
          <h2>Coupon</h2>
          <form>
            <div className="text-left form-group">
              <input style={{ width: '53%' }} type="text" className="form-control input-lg" />
            </div>
            <Button type="submit" bsSize="lg">Place Order</Button>
          </form>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.cart.cartItems.length,
    total: state.total
  }
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(Checkout);