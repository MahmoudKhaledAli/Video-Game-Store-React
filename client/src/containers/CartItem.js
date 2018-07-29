import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

import { AddToCartButton } from 'containers';
import { deleteItem } from 'actions';

import 'styles/style.css';

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = { quantity: this.props.cartItem.quantity };
  }

  handleInputChange(event) {
    this.setState({ quantity: event.target.value });
  }

  handleDeleteClick() {
    this.props.deleteItem(this.props.cartItem.idproduct);
  }

  render() {
    const { product: { idproduct, name, platform, price, sale }, final_price } = this.props.cartItem;

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.platforms[platform]}</td>
        <td>
          <div className="col-xs-4">
            <input onChange={this.handleInputChange.bind(this)} className="form-control" type="number" name="quantity" value={this.state.quantity} />
          </div>
        </td>
        <td>{price}</td>
        <td>{sale}</td>
        <td>{final_price}</td>
        <td>
          <AddToCartButton idproduct={idproduct} quantity={this.state.quantity} />
        </td>
        <td>
          <Button onClick={this.handleDeleteClick.bind(this)} bsStyle="danger">Delete Item</Button>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteItem })(CartItem);