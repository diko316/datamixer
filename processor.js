'use strict';

var PROMISE = require('bluebird'),
    EXPORTS = create,
    PROCESSORS = {};

function define(name, creator) {
    if (!name || typeof name !== 'string') {
        throw new Error('invalid [name] parameter: ' + name);
    }
    else if (!(creator instanceof Function)) {
        throw new Error('invalid process creator');
    }
    PROCESSORS[name] = creator;
    return EXPORTS;
}

function create(name) {
    var list = PROCESSORS;
    var runner;
    if (list.hasOwnProperty(name)) {
        runner = list[name].apply(EXPORTS,
                                  Array.prototype.slice.call(arguments, 1)
                                );
        if (runner instanceof Function) {
            return runner;
        }
        else {
            throw new Error('[' + name + '] created an invalid runner.');
        }
    }
    return void(0);
}

function instantiate(runner) {
    if (runner instanceof Function) {
        return new Processor(runner);
    }
    throw new Error('[runner] parameter is not a Function');
}

function Processor(runner) {
    if (runner instanceof Function) {
        this.runner = PROMISE.method(runner);
    }
    else {
        throw new Error('runner parameter is not a Function');
    }
}

Processor.prototype = {
    runner: void(0),
    constructor: Processor,
    pipe: function (runner) {
        var previous = this.runner;
        
        function piped() {
            /*jshint validthis:true */
            var me = this;
            return previous.apply(me, arguments).
                        bind(me).
                        then(runner);
        }
        
        this.runner = piped;
        return this;
    },
    run: function (bind, args) {
        return this.runner.apply(bind, args);
    }
};


EXPORTS['default'] = EXPORTS;
EXPORTS.define = define;
EXPORTS.instantiate = instantiate;

module.exports = EXPORTS;