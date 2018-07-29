import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { checkout } from 'actions';
import { alert } from 'components';

import { Button } from 'react-bootstrap';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = { coupon: '' };
  }

  handleCouponChange(event) {
    this.setState({ coupon: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.checkout(this.props.total, this.state.coupon, () => {
      this.props.alert();
    });
  }

  render() {
    const { cartItems, total } = this.props;

    if (cartItems) {
      return (
        <div className="pull-right">
          <h2>Total: {total}</h2>
          <h2>Coupon</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="text-left form-group">
              <input style={{ width: '53%' }} type="text" className="form-control input-lg" value={this.state.coupon} />
            </div>
            <Button type="submit" bsStyle="primary" bsSize="lg">Place Order</Button>
          </form>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.cart.cartItems !== {},
    total: state.cart.total
  }
}

const enhance = compose(
  connect(mapStateToProps, { checkout }),
  alert({ title: 'Checkout', successMsg: 'Order placed successfully' })
);

export default enhance(Checkout);