import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';

import { UserOrder } from 'components';

class UserOrderList extends Component {
  renderWithLayout(cart) {
    return (
      <div className="row">
        <div className="col-lg-12">
          {cart}
        </div>
      </div>
    );
  }

  render() {
    const { orders } = this.props;

    if (orders.length === 0) {
      return this.renderWithLayout(<h1 align="center">You have not made any orders yet!</h1>);
    }

    const orderListJSX = (
      <div>
        <h2>My Orders</h2>
        <div className="row">
          <div className="col-lg-12">
            <div className="main-box no-header clearfix">
              <div className="main-box-body clearfix">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th><span>ID</span></th>
                        <th><span>Items</span></th>
                        <th><span>Created</span></th>
                        <th><span>Status</span></th>
                        <th><span>Total</span></th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {_.map(orders, order => <UserOrder key={order.idorder} order={order} orderStatus={this.props.orderStatus} />)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return this.renderWithLayout(orderListJSX);
  }
}

function mapStateToProps({ orders }) {
  return { orders }
}

const enhance = compose(
  connect(mapStateToProps)
);

export default enhance(UserOrderList);