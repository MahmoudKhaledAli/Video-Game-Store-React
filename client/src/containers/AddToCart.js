import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Formik } from 'formik';

import { requireAuth, alert } from 'components';
import { addToCart } from 'actions';

class AddToCart extends Component {
  handleFormSubmit(values, actions) {
    actions.setSubmitting(false);
    this.props.addToCart({ idproduct: this.props.productId, ...values }, () => {
      this.props.alert('');
    })
  }

  renderForm(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <input
            type="number"
            min="1"
            max={props.stock}
            className="form-control"
            style={{ width: '100px' }}
            name="quantity"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.quantity}
            required
          />
        </div>
        <button type="submit" className="btn btn-success btn-md">
          <span className="glyphicon glyphicon-shopping-cart" /> Add To Cart
        </button>
      </form>
    );
  }

  render() {
    return (
      <Formik
        initialValues={{ quantity: '1' }}
        onSubmit={this.handleFormSubmit.bind(this)}
        render={this.renderForm}
      />
    );
  }
}

const enhance = compose(
  requireAuth(false),
  connect(null, { addToCart }),
  alert({ title: 'Add to cart', successMsg: 'Product added to cart!' })
);

export default enhance(AddToCart);