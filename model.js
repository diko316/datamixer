'use strict';

var TYPE = require('type-caster'),
    UTIL = require('util'),
    INTERESTING = require('interesting'),
    EXPORTS = {},
    MODELS = {};
    
function register(name, Class) {
    MODELS[name] = Class;
    Class.prototype['@model'] = name;
    return EXPORTS;
}

function get(name) {
    var list = MODELS;
    return list.hasOwnProperty(name) ? list[name] : void(0);
}

function resolve(name) {
    return get(name) || Model;
}

function has(name) {
    return MODELS.hasOwnProperty(name);
}

function is(Class) {
    var Base = Model;
    if (Class instanceof Function) {
        return Class === Base || Class.prototype instanceof Base;
    }
    return false;
}

function createConstructor(properties, superclass) {
    var SuperClass = resolve(superclass),
        E = empty,
        hasOwn = Object.prototype.hasOwnProperty;
    var prototype, name;
    
    function Model() {
        
        var Class = Model,
            E = empty,
            instance = this;
            
        if (instance instanceof Class) {
        
            SuperClass.apply(instance, arguments);
            
            if (hasOwn.call(prototype, 'initialize')) {
                prototype.initialize.call(instance);
            }
            
        }
        else {
            E.prototype = Class.prototype;
            instance = new E();
            Class.apply(instance, arguments);
        }
        return instance;
        
    }
    
    E.prototype = SuperClass.prototype;
    Model.prototype = prototype = new E();
    
    for (name in properties) {
        if (hasOwn.call(properties, name)) {
            prototype[name] = properties[name];
        }
    }
    
    prototype.constructor = Model;
   
    
    return Model;
    
}

function empty() {
    
}

function Model(defaultValue) {
    var me = this,
        type = me['@type'];
        
    this.raw = defaultValue;
    
    this.data = arguments.length && type.validate(defaultValue) ?
                    type.cast(defaultValue) : type.cast();
    
}

Model.prototype = {
    
    '@type': TYPE('default'),
    data: void(0),
    raw: void(0),
    
    constructor: Model,
    
    id: function () {
        var me = this,
            O = Object.prototype;
        var value;
        
        if (!O.hasOwnProperty.call(me, '@id')) {
            value = me.data;
            switch (O.toString.call(value)) {
            case '[object RegExp]':
            case '[object Function]':
            case '[object Array]':
            case '[object Object]':
                value = value.id;
                break;
            case '[object Number]':
                if (!isFinite(value)) {
                    value = void(0);
                }
                break;
            case '[object String]':
                if (!value.length) {
                    value = void(0);
                }
                break;
            default:
                value = void(0);
            }
            me['@id'] = value;
        }
        return me['@id'];
    },
    
    isValid: function () {
        return this['@type'].validate(this.data);
    },
    
    valueOf: function (raw) {
        return raw === true ?
                    this.raw : this.data;
    },
    
    toString: function (raw) {
        var me = this,
            value = me.valueOf(raw);
            
        return '[' +
                    me['@type'].$name +
                    ' ' +
                    me['@model'] +
                ']' + ' (' + UTIL.inspect(value, { showHidden: true }) + ')';
    },
    
    inspect: function () {
        return this.toString();
    }
};


EXPORTS['default'] = EXPORTS;
EXPORTS.Model = Model;
EXPORTS.register = register;
EXPORTS.get = get;
EXPORTS.has = has;
EXPORTS.is = is;
EXPORTS.createConstructor = createConstructor;
EXPORTS.events = INTERESTING();

module.exports = EXPORTS;