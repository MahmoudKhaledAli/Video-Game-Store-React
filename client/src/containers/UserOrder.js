import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import { OrderItem } from 'components';
import 'styles/style.css';


class UserOrder extends Component {
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
          {!status ? <Button bsStyle="danger">Delete Order</Button> : null}
        </td>
      </tr>
    );
  }
}

export default UserOrder;