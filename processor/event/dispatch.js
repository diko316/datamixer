'use strict';

var EVENTS = require('../../model.js').events;

module.exports = function (data, event, meta) {
    console.log('event: ', event);
    EVENTS.publish(meta.name + ':' + meta.method, data);

    return data;
};