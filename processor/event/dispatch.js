'use strict';

var EVENTS = require('../../model.js').events;

module.exports = function (data, process, meta) {
    var name = meta.name,
        method = meta.method,
        typeOverride = process.eventType,
        type = typeOverride && typeof typeOverride === 'string' ?
                    typeOverride : name + ':' + method;

    //console.log('type: ', meta.name + ':' + meta.method, 'event: ', event, ' meta: ', meta);
    EVENTS.publish(type, {
                type: type,
                model: name,
                method: method,
                target: this,
                data: data
            });

    return data;
};