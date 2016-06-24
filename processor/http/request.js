'use strict';

var HTTP = require('axios'),
    STATUS = require('http-status-code'),
    PROMISE = require('bluebird'),
    OBJECT = Object.prototype,
    toString = OBJECT.toString;
    
    
function assign(target, source) {
    var hasOwn = OBJECT.hasOwnProperty;
    var name;
    
    for (name in source) {
        if (hasOwn.call(source, name)) {
            target[name] = source[name];
        }
    }
    
    return target;
}

function formatSuccess(data) {
    if (toString.call(data) !== '[object Object]') {
        return formatFail();
    }
    return data;
}

function formatFail(data) {
    var o = {
            data: void(0),
            status: 400,
            statusText: STATUS.getMessage(400),
            headers: {},
            config: {}
        };
    
    var text;
    
    switch (toString.call(data)) {
    case '[object Number]':
        if (isFinite(data)) {
            text = STATUS.getMessage(data);
            
            if (text) {
                o.status = data;
                o.statusText = text;
            }
        }
        break;
    
    case '[object String]':
        if (data) {
            o.statusText = data;
        }
        break;
    
    case '[object Object]':
        assign(o, data);
        // try generating text
        text = data.status;
        if (typeof text === 'number' && isFinite(text)) {
            text = STATUS.getMessage(text);
            if (text && typeof text === 'string') {
                o.statusText = text;
            }
        }
        break;
    }

    return PROMISE.reject(o);
}

function process(data) {
    
    if (toString.call(data) === '[object Object]') {
        return HTTP(data).then(formatSuccess, formatFail);
    }

    return formatFail();
}

module.exports = process;