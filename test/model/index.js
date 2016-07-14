'use strict';

var MODEL = use('index.js'),
    TYPE = MODEL.type;

MODEL.define('TestModel', {
    type: TYPE('object').
                schema({
                    id: 'number',
                    name: 'string'
                })
});


require('./constructor.js');
require('./id.js');
require('./valueOf.js');
require('./isValid.js');