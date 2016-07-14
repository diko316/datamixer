'use strict';

describe('Model.prototype.isValid()',
    function () {
        var MODEL = use('index.js'),
            TYPE = MODEL.type;
        
        // define Model with string type
        MODEL.define('TestModelIsValidString', {
            type: TYPE('string')
        });
        
        // define Model with number type
        MODEL.define('TestModelIsValidNumber', {
            type: TYPE('number')
        });
        
        // define Model with boolean type
        MODEL.define('TestModelIsValidBoolean', {
            type: TYPE('boolean')
        });
        
        // define Model with object type
        MODEL.define('TestModelIsValidObject', {
            type: TYPE('object').
                        schema({
                            id: 'number',
                            name: 'string'
                        })
        });
        it('should validate record\'s data [string]');
        it('should validate record\'s data [number]');
        it('should validate record\'s data [boolean]');
        it('should validate record\'s data [object]');
    });