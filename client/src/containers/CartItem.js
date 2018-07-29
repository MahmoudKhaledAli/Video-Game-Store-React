import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import 'styles/style.css';

class CartItem extends Component {
  render() {
    const { product: { name, platform, price, sale }, quantity, final_price } = this.props.cartItem;

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.platforms[platform]}</td>
        <td>
          <div className="col-xs-4">
            <input className="form-control" type="number" name="quantity" value={quantity} />
          </div>
        </td>
        <td>{price}</td>
        <td>{sale}</td>
        <td>{final_price}</td>
        <td>
          <Button>Update Item</Button>
        </td>
        <td>
          <Button bsSize="danger">Delete Item</Button>
        </td>
      </tr>
    );
  }
}

export default CartItem;