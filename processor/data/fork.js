'use strict';

var PROMISE = require('bluebird');

module.exports = function (data) {
    var me = this,
        record = new (me.constructor)(data),
        valid = me['@type'].validate(record.data);
    
    me = null;
    
    if (valid.error) {
        return PROMISE.reject(valid);
    }
    return record;
};
