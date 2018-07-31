import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

import { OrderItem } from 'components';
import { deleteOrder } from 'actions';
import 'styles/style.css';


class UserOrder extends Component {
  handleClick() {
    this.props.deleteOrder(this.props.order.idorder);
  }

  render() {
    const { order: { idorder, items, datecreated, status, total }, orderStatus } = this.props;

    return (
      <tr>
        <td>{idorder}</td>
        <td>{items.map(item => <OrderItem key={item.name} item={item} />)}</td>
        <td>{datecreated}</td>
        <td>{orderStatus[status]}</td>
        <td>{total}</td>
        <td style={{ width: '20%' }}>
          {!status ? <Button onClick={this.handleClick.bind(this)} bsStyle="danger">Delete Order</Button> : null}
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteOrder })(UserOrder);