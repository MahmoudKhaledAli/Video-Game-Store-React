import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

import { addToCart } from 'actions';
import { requireAuth, alert } from 'components';

class AddToCartButton extends Component {
  handleClick(event) {
    event.preventDefault();
    this.props.addToCart({ idproduct: this.props.idproduct, quantity: this.props.quantity }, () => {
      this.props.alert();
    });
  }

  render() {
    return (
      <Button onClick={this.handleClick.bind(this)} bsStyle="success" bsSize={this.props.size}>
        <span className="glyphicon glyphicon-shopping-cart" /> Add To Cart
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.errors.addToCart };
}

const enhance = compose(
  requireAuth(false),
  connect(mapStateToProps, { addToCart }),
  alert({ title: 'Add to cart', successMsg: 'Product added to cart!' })
);

export default enhance(AddToCartButton);