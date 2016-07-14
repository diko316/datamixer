'use strict';

describe('Model.prototype.valueOf()',
    function () {
        var MODEL = use('index.js'),
            TYPE = MODEL.type;
        
        // define Model with string type
        MODEL.define('TestModelValueOfString', {
            type: TYPE('string')
        });
        
        // define Model with number type
        MODEL.define('TestModelValueOfNumber', {
            type: TYPE('number')
        });
        
        // define Model with boolean type
        MODEL.define('TestModelValueOfBoolean', {
            type: TYPE('boolean')
        });
        
        // define Model with object type
        MODEL.define('TestModelValueOfObject', {
            type: TYPE('object').
                        schema({
                            id: 'number',
                            name: 'string'
                        })
        });
        it('should return record\'s data [string]');
        it('should return record\'s data [number]');
        it('should return record\'s data [boolean]');
        it('should return record\'s data [object]');
    });