'use strict';

var TYPE = require('type-caster'),
    PROCESSOR = require('tee-back'),
    EXPORTS = require('./manager.js'),
    COLLECTION = require('./collection.js'),
    MODEL = require('./model.js');

module.exports = EXPORTS;
EXPORTS.collection = COLLECTION;

// define types
TYPE.define('text', require('./type/text.js'));
TYPE.define('numeric', require('./type/numeric.js'));
TYPE.define('integer', require('./type/integer.js'));
TYPE.define('float', require('./type/float.js'));
TYPE.define('enum', require('./type/enum.js'));
TYPE.define('record', require('./type/record.js'));
TYPE.define('list', require('./type/list.js'));


// define processors
PROCESSOR.define('data.fork', require('./processor/data/fork.js'));
PROCESSOR.define('data.validate', require('./processor/data/validate.js'));
PROCESSOR.define('event.dispatch', require('./processor/event/dispatch.js'));
PROCESSOR.define('http.request', require('./processor/http/request.js'));


// define default models
MODEL.register('BaseModel', MODEL.Model);
TYPE.define('BaseModel', TYPE('record').model(MODEL.Model));



