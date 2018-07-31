const _ = require('lodash');

_.mixin({
  'rename': (obj, key, newKey) => {
    if (_.includes(_.keys(obj), key)) {
      obj[newKey] = _.clone(obj[key], true)
      delete obj[key]
    }
    return obj;
  }
});

exports.convertOrders = orders => {
  return _.map(_.map(_.groupBy(orders, 'idorder'), order => order.map(orderItem => _.pick(orderItem, ['name', 'quantity', 'datecreated', 'status', 'total', 'idorder', 'idproduct', 'username']))), order => {
    orderObject = Object();
    orderObject.idorder = order[0].idorder;
    orderObject.total = order[0].total;
    orderObject.status = order[0].status;
    orderObject.datecreated = order[0].datecreated;
    orderObject.username = order[0].username;
    orderObject.items = order.map(orderItem => _.pick(orderItem, ['idproduct', 'name', 'quantity']));
    return orderObject;
  });
}