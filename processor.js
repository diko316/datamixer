'use strict';

var PROMISE = require('bluebird'),
    EXPORTS = module.exports = get,
    PROCESSORS = {};

/**
 * definition config:
 *      []
 *
 */


function define(name, processor) {
    if (name && typeof name === 'string') {
        PROCESSORS[name] = create(processor);
    }
    return EXPORTS;
}

function get(name) {
    var list = PROCESSORS;
    if (list.hasOwnProperty(name)) {
        return name;
    }
    return void(0);
}

function create(processor) {
    var Class = Processor;
    if (processor instanceof Function) {
        return new Class(processor);
    }
    else if (!(processor instanceof Class)) {
        throw new Error('[processor] must be a Function or a Processor');
    }
    return processor;
}

function is(processor) {
    return processor instanceof Processor;
}

function Processor(runner) {
    if (!(runner instanceof Function)) {
        throw new Error('[runner] parameter must be a Function');
    }
    this.$runner = PROMISE.method(runner);
    return this;
}

Processor.prototype = {
    $runner: void(0),
    constructor: Processor,
    pipe: function (next) {
        var Class = Processor;
        var my;
        if (next instanceof Class) {
            next = next.$runner;
        }
        else if (next instanceof Function) {
            next = PROMISE.method(next);
        }
        else {
            throw new Error('[next] parameter must be a Function or Processor');
        }
        my = this.$runner;
        return new Class(
                    function () {
                        return my.apply(this, arguments).
                                then(next.bind(this));
                    });
    }
};

EXPORTS['default'] = EXPORTS;
EXPORTS.define = define;
EXPORTS.create = create;
EXPORTS.is = is;

module.exports = EXPORTS;