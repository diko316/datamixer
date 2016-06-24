'use strict';

var EXPORTS = instantiate,
    TYPE = require('type-caster'),
    PROCESSOR = require('./processor.js'),
    MODEL = require('./model.js'),
    DEFINITIONS = {},
    MODEL_RE = /^[A-Z]/,
    METHOD_RE = /^\@([a-zA-Z\_][a-zA-Z0-9\_]*)$/;

function define(name, config) {
    var list = DEFINITIONS,
        processMgr = PROCESSOR,
        type = TYPE,
        O = Object.prototype,
        A = Array,
        toString = O.toString,
        F = Function,
        methodRe = METHOD_RE,
        modelRe = MODEL_RE;
        
    var definition, m, key, item, hasOwn, properties, requires, create;
    
    if (modelRe.test(name) &&
        !list.hasOwnProperty(name) &&
        toString.call(config) === '[object Object]') {
        create = createMethod;
        hasOwn = O.hasOwnProperty;
        definition = {
            name: name,
            type: null,
            extend: null,
            declared: false,
            requires: requires = [],
            properties: properties = {}
        };
        
        for (key in config) {
            if (!hasOwn.call(config, key)) {
                continue;
            }
            item = config[key];
            // create type
            if (key === 'type') {
                // cast non-model type
                if (item && typeof item === 'string' &&
                    !modelRe.test(item)) {
                    if (type.has(item)) {
                        item = type(item);
                    }
                    else {
                        throw new Error('[' +
                                        name +
                                        '] type cannot be resolved');
                    }
                }
                else if (toString.call(item) === '[object Object]') {
                    // create object type
                    if (!type.is(item)) {
                        item = type('object').schema(item);
                    }
                }
                
                if (!type.is(item)) {
                    throw new Error('[' +
                                    name +
                                    '] type definition is invalid');
                }
                definition.type = properties['@type'] = item;
                
            }
            // extend
            else if (key === 'extend') {
                if (item && typeof item === 'string') {
                    requires[requires.length] = definition.extend = item;
                }
            }
            // create method
            else if (methodRe.test(key)) {
                m = key.match(methodRe);
                type = m[1];
                if (typeof item === 'string' ||
                    item instanceof F ||
                    processMgr.is(item)) {
                    item = [item];
                }

                if (item instanceof A) {
                    properties[type] = create(item);
                }
                else {
                    throw new Error('[' +
                                        type +
                                        '] method definition is invalid');
                }
            }
        }
        
        list[name] = definition;
        
    }
    
    return EXPORTS;
}

function declare(name) {
    var modelMgr = MODEL,
        get = getDefinition,
        main = get(name);
    var pending, l, total, definition, requires, rl,
        requireDefinition, inQueue, qn, type, Model;
    
    if (main) {
        if (main.declared) {
            return modelMgr.get(name);
        }
        pending = [name];
        l = total = 1;
        inQueue = {};
        inQueue[':' + name] = true;
        
        next: for (; l--;) {
            name = pending[l];
            definition = get(name);
            
            // proceed to next if not defined
            if (!definition) {
                continue;
            }
            // proceed to next if declared
            else if (definition.declared) {
                pending.splice(l, 1);
                l = --total;
                continue;
            }
            
            // check requires
            requires = definition.requires;
            rl = requires.length;
            
            for (; rl--;) {
                name = requires[rl];
                requireDefinition = get(name);
                if (requireDefinition) {
                    qn = ':' + name;
                    if (requireDefinition.declared) {
                        requires.splice(rl, 1);
                    }
                    else if (!(qn in inQueue)) {
                        inQueue[qn] = true;
                        pending[total++] = name;
                        l = total;
                    }
                }
                // unable to define if one of "requires" is not defined
                else {
                    continue next;
                }
            }
            
            // must declare required model first
            if (requires.length) {
                continue;
            }
            
            // define and register
            type = TYPE;
            name = definition.name;
            Model = modelMgr.createConstructor(
                            definition.properties,
                            definition.extend);
            modelMgr.register(name, Model);
            definition.declared = true;
            
            // register type
            type.define(name,
                type('record').model(Model)
            );
           
            // reset counter to declare last item
            pending.splice(l, 1);
            l = --total;
        }
        
        return modelMgr.get(main.name);
    
    }
    else {
        throw new Error('unable to declare undefined model [' + name + ']');
    }
    
    return void(0);
}

function getDefinition(name) {
    var list = DEFINITIONS;
    return list.hasOwnProperty(name) ? list[name] : void(0);
}

function instantiate(name, data) {
    var definition = getDefinition(name);
    var Model;
    
    if (!definition) {
        throw new Error('model not defined [' + name + ']');
    }
    
    Model = definition.declared ?
                    MODEL.get(name) : declare(name);
    
    if (!Model) {
        throw new Error('unable to declare Model [' + name + ']');
    }
    
    return new Model(data);

}

function createMethod(items) {
    var processMgr = PROCESSOR,
        F = Function,
        processor = null;
    var c, l, item;
    
    for (c = -1, l = items.length; l--;) {
        item = items[++c];
        if (typeof item === 'string') {
            item = processMgr(item);
            if (!item) {
                throw new Error('Unable to find method [' + item + ']');
            }
        }
        else if (!(item instanceof F) && !processMgr.is(item)) {
            throw new Error('Unable to resolve processor method');
        }
        
        processor = processor ?
                        processor.pipe(item) : processMgr.create(item);
                        
    }
    
    return function () {
        return processor.$runner.apply(this, arguments);
    };
    
    
}





module.exports = EXPORTS['default'] = EXPORTS;
EXPORTS.define = define;
EXPORTS.type = TYPE;
EXPORTS.processor = PROCESSOR; 

// define types
TYPE.define('record', require('./type/record.js'));



// register base model type
MODEL.register('Base', MODEL.Model);
TYPE.define('Base',
    TYPE('record').model(MODEL.Model)
);


