'use strict';

var EXPORTS = instantiate,
    PROCESSOR = require('./processor.js'),
    MODEL = require('./model.js'),
    DEFINITIONS = {},
    MODEL_RE = /^[A-Z]/,
    METHOD_RE = /^\@([a-zA-Z\_][a-zA-Z0-9\_]*)$/;

function define(name, config) {
    var list = DEFINITIONS,
        O = Object.prototype,
        A = Array,
        toString = O.toString,
        F = Function,
        methodRe = METHOD_RE;
        
    var definition, m, key, item, hasOwn, properties, type, requires;
    
    if (MODEL_RE.test(name) &&
        !list.hasOwnProperty(name) &&
        toString.call(config) === '[object Object]') {
        
        hasOwn = O.hasOwnProperty;
        definition = {
            type: null,
            extend: null,
            declared: false,
            requires: requires = [],
            properties: properties = {},
            Class: void(0)
        };
        
        for (key in config) {
            if (!hasOwn.call(config, key)) {
                continue;
            }
            item = config[key];
            // create type
            if (key === 'type') {
                type = toString.call(item);
                if (!type ||
                    (type !== '[object Object]' &&
                     type !== '[object String]')) {
                    throw new Error(
                                '[' + name + '] has invalid type definition');
                }
                definition.type = item;
                
            }
            // extend
            else if (key === 'extends') {
                if (item && typeof item === 'string') {
                    requires[requires.length] = definition.extend = item;
                }
            }
            // create method
            else if (methodRe.test(key)) {
                m = key.match(methodRe);
                type = m[1];
                if (typeof item === 'string') {
                    item = [item];
                }
                if (item instanceof A) {
                    properties['$' + type] = createMethod(type, item);
                }
                else if (item instanceof F) {
                    properties['$' + type] = item;
                }
                else {
                    throw Error('[' + type + '] method definition is invalid');
                }
            }
        }
        
        list[name] = definition;
        
    }
    
    return EXPORTS;
}

function createMethod(name, items) {
    var F = Function,
        processMgr = PROCESSOR,
        processor = void(0);
    var c, l, item, runner;
    
    function method() {
        /*jshint validthis:true */
        return processor.run(this, arguments);
    }
    
    for (c = -1, l = items.length; l--;) {
        item = items[++c];
        runner = null;
        if (typeof item === 'string') {
            runner = processMgr(item);
        }
        else if (item instanceof F) {
            runner = F;
        }
        else {
            throw new Error('[' + name + '] method contains invalid processor');
        }
        if (processor) {
            processor.pipe(runner);
        }
        else {
            processor = processMgr.instantiate(runner);
        }
    }
    
    if (!processor) {
        throw new Error('[' + name + '] method definition is empty or ' +
                    'unable to generate processors');
    }
    return method;
}

function instantiate(name, data) {
    var list = DEFINITIONS;
    var definition;
    if (list.hasOwnProperty(name)) {
        definition = list[name];
        if (!definition.declared) {
            declare(name);
        }
        return new (MODEL.get(name))(data);
    }
    throw new Error('[' + name + '] is not defined');
}

function declare(name) {
    var list = DEFINITIONS;
    var definition;
    if (list.hasOwnProperty(name)) {
        
    }
    return void(0);
}


EXPORTS['default'] = EXPORTS;
EXPORTS.define = define;

module.exports = EXPORTS;

