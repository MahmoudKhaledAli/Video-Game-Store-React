import React, { Component } from 'react';
import { compose } from 'redux';

import { requireAuth } from 'components';
import { AddToCartButton } from 'containers';

class AddToCart extends Component {
  constructor(props) {
    super(props);

    this.state = { quantity: 1 };
  }

  handleInputChange(event) {
    this.setState({ quantity: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <input
            onChange={this.handleInputChange.bind(this)}
            type="number"
            min="1"
            max={this.props.stock}
            className="form-control"
            style={{ width: '100px' }}
            value={this.state.quantity}
          />
        </div>
        <AddToCartButton idproduct={this.props.productId} size="lg" quantity={this.state.quantity} />
      </div>
    );
  }
}

const enhance = compose(
  requireAuth(false)
);

export default enhance(AddToCart);