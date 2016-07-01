'use strict';

var PROMISE = require('bluebird');

module.exports = function (data) {
    var P = PROMISE,
        valid = this['@type'].validate(data);
        
    return P[valid.error ? 'reject' : 'resolve'](valid);
};