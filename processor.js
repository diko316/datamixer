'use strict';

var PROMISE = require('bluebird'),
    EXPORTS = module.exports = get,
    PROCESSORS = {};
var Processor;

/**
 * definition config:
 *      []
 *
 */


function define(name, config) {
    
    return EXPORTS;
}

function get() {
    
}

function empty() {
    
}

function createProcessor(SuperClass, args) {
    var E = empty;
    var Proto, runner, creatorArgs;
    
    function Processor() {
        var instance = this;
        if (!(instance instanceof Processor)) {
            
        }
        else {
            
        }
    }
    
    E.prototype = SuperClass.prototype;
    Processor.prototype = Proto = new E();
    Proto.constructor = Processor;
   
    return Processor;
}

function BaseProcessor() {
}

BaseProcessor.prototype = {
    constructor: BaseProcessor,
    creator: function () {
        return function (data) {
                    return data;
                };
    }
};



Processor = createProcessor(
    BaseProcessor,
    []);


EXPORTS['default'] = EXPORTS;
EXPORTS.define = define;

module.exports = EXPORTS;