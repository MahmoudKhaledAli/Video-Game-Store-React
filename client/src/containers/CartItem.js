import React, { Component } from 'react';

import 'styles/style.css';

class CartItem extends Component {
  render() {
    console.log(this.props.cartItem);
    
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
          <button className="btn btn-primary btn-md">Update Item</button>
        </td>
        <td>
          <button className="btn btn-danger btn-md">Delete Item</button>
        </td>
      </tr>
    );
  }
}

export default CartItem;