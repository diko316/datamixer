'use strict';

describe('Model.prototype.id():string|number',
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
        it('should return record\'s unique identifier [string]',
            function () {
                var record = MODEL('TestModelIdString', 'buang'),
                    result = false;
                try {
                    result = record.id();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record identifier without error');
                
                assert(result === 'buang',
                    'should return string record identifier same as record value');
                
            });
        it('should return record\'s unique identifier [number]',
            function () {
                var record = MODEL('TestModelIdNumber', 3),
                    result = false;
                try {
                    result = record.id();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record identifier without error');
                
                assert(result === 3,
                    'should return number record identifier same as record value');
                
            });
        it('should return record\'s unique identifier [boolean]',
            function () {
                var record = MODEL('TestModelIdBoolean', true),
                    result = false;
                try {
                    result = record.id();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record identifier without error');
                
                assert(result === 1,
                    'should return number=1 record identifier from boolean "true" record value');
                
                
                record = MODEL('TestModelIdBoolean', false),
                    result = false;
                try {
                    result = record.id();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record identifier without error');
                
                assert(result === 0,
                    'should return number=0 record identifier from boolean "false" record value');
                
            });
        it('should return record\'s unique identifier [object]',
            function () {
                var record = MODEL('TestModelIdObject', {
                                    id: 5,
                                    name: 'buang'
                                }),
                    result = false;
                try {
                    result = record.id();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record identifier without error');
                
                assert(result === 5,
                    'should return number=5 record identifier from object.id record value');
                
            });
    });