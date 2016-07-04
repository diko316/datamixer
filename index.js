'use strict';

var EXPORTS = instantiate,
    TYPE = require('type-caster'),
    PROCESSOR = require('tee-back'),
    MODEL = require('./model.js'),
    DEFINITIONS = {},
    MODEL_RE = /^[A-Z][a-zA-Z0-9\-\_]+(\.[A-Z][a-zA-Z0-9\-\_]+)*$/,
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
    
    if (!modelRe.test(name)) {
        throw new Error('[name] parameter is invalid');
    }
    
    if (list.hasOwnProperty(name)) {
        throw new Error('[' + name + '] model is already defined');
    }
    
    if (toString.call(config) !== '[object Object]') {
        throw new Error('[config] parameter should be a valid config object');
    }
    
    
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
                                    item +
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
                                item +
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
                properties[type] = create(name, type, item);
            }
            else {
                throw new Error('[' +
                                    type +
                                    '] method definition is invalid');
            }
        }
    }
   
    list[name] = definition;
        
    
    
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

function exist(name) {
    var definition = getDefinition(name);
    
    if (defintion) {
        
        // try declaring
        declare(name);

        return defintion.declared;
    
    }
    
    return false;
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

function subscribe() {
    var events = MODEL.events;
    return events.subscribe.apply(events, arguments);
}

function createMethod(name, method, items) {
    var processMgr = PROCESSOR,
        processor = null;
    var c, l, item;
    
    for (c = -1, l = items.length; l--;) {
        item = items[++c];
        // resolve processor
        if (processor) {
            processor = processor.pipe(item);
            
        }
        else {
            processor = processMgr(item);
        }
        if (!processor) {
            throw new Error(
                    'Unable to resolve processor method [' + item + ']');
        }
                        
    }
    
    return function () {
        var args = Array.prototype.slice.call(arguments);
        
        args.splice(1, 0, {
                            instance: this,
                            name: name,
                            method: method
                        });
        
        // must accept meta
        return processor.valueOf().apply(this, args);
    };
    
    
}





module.exports = EXPORTS['default'] = EXPORTS;
EXPORTS.define = define;
EXPORTS.type = TYPE;
EXPORTS.subscribe = subscribe;
EXPORTS.exist = exist;
EXPORTS.Class = MODEL.Model;

// define types
TYPE.define('text', require('./type/text.js'));
TYPE.define('numeric', require('./type/numeric.js'));
TYPE.define('integer', require('./type/integer.js'));
TYPE.define('float', require('./type/float.js'));
TYPE.define('enum', require('./type/enum.js'));
TYPE.define('record', require('./type/record.js'));

// define processors
PROCESSOR.define('data.fork', require('./processor/data/fork.js'));
PROCESSOR.define('data.validate', require('./processor/data/validate.js'));
PROCESSOR.define('event.dispatch', require('./processor/event/dispatch.js'));
PROCESSOR.define('http.request', require('./processor/http/request.js'));

// register base model type
MODEL.register('Base', MODEL.Model);
TYPE.define('Base',
    TYPE('record').model(MODEL.Model)
);


