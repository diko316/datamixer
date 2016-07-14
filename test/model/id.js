'use strict';

describe('Model.prototype.id()',
    function () {
        var MODEL = use('index.js'),
            TYPE = MODEL.type;
        
        // define Model with string type
        MODEL.define('TestModelIdString', {
            type: TYPE('string')
        });
        
        // define Model with number type
        MODEL.define('TestModelIdNumber', {
            type: TYPE('number')
        });
        
        // define Model with boolean type
        MODEL.define('TestModelIdBoolean', {
            type: TYPE('boolean')
        });
        
        // define Model with object type
        MODEL.define('TestModelIdObject', {
            type: TYPE('object').
                        schema({
                            id: 'number',
                            name: 'string'
                        })
        });
        it('should return record\'s unique identifier [string]');
        it('should return record\'s unique identifier [number]');
        it('should return record\'s unique identifier [boolean]');
        it('should return record\'s unique identifier [object]');
    });