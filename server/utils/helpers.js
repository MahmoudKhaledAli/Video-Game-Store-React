const _ = require('lodash');

_.mixin({
  'rename': (obj, key, newKey) => {
    if (_.includes(_.keys(obj), key)) {
      obj[newKey] = _.clone(obj[key], true)
      delete obj[key]
    }
    return obj
  }
});