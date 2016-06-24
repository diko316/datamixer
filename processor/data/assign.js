'use strict';

module.exports = function (data) {
    var result = this['@type'].cast(data);
    this.raw = data;
    this.data = result;
    return result;
};