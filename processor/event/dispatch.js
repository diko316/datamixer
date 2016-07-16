'use strict';

var EVENTS = require('../../model.js').events;

module.exports = function (data, process, meta) {
    var name = meta.name,
        method = meta.method,
        type = process.eventType;
    
    // apply override if valid string
    if (!type || typeof type !== 'string') {
        type = name + ':' + method;
    }
    
    EVENTS.publish(type, {
                type: type,
                model: name,
                method: method,
                target: this,
                data: data
            });

    return data;
};