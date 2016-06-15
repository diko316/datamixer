'use strict';

var TYPE = require('type-caster'),
    UTIL = require('util'),
    EXPORTS = {},
    MODELS = {};
    
function register(name, Class) {
    MODELS[name] = Class;
    return EXPORTS;
}

function get(name) {
    var list = MODELS;
    return list.hasOwnProperty(name) ? list[name] : void(0);
}

function has(name) {
    return MODELS.hasOwnProperty(name);
}

function resolveType(value) {
    var type = TYPE,
        O = Object.prototype;
        
    switch (O.toString.call(value)) {
    case '[object String]':
        if (!type.has(value)) {
            break;
        }
        return type(value);
    
    case '[object Object]':
        if (type.is(value)) {
            return value;
        }
        
    }
    
    return void(0);
}

function Model(defaultValue) {
    var me = this,
        type = me['@type'];
        
    // TODO: resolve type
    if (!TYPE.is(type)) {
        me.constructor.prototype['@type'] = resolveType(type);
    }
    me['@meta'] = {
        raw: defaultValue,
        data: arguments.length ?
                    type.cast(defaultValue) : type.cast()
    };
}

Model.prototype = {
    
    '@type': TYPE('default'),
    '@meta': void(0),
    
    constructor: Model,
    
    valueOf: function (raw) {
        var meta = this['@meta'];
        return raw === true ?
                    meta.raw : meta.data;
    },
    
    toString: function (raw) {
        var me = this,
            value = me.valueOf(raw);
            
        return '[' +
                    me['@type'].$name + ' ' +
                    UTIL.inspect(value, { showHidden: true }) +
                ']';
    }
};


EXPORTS['default'] = EXPORTS;
EXPORTS.Model = Model;
EXPORTS.register = register;
EXPORTS.get = get;
EXPORTS.has = has;

module.exports = EXPORTS;