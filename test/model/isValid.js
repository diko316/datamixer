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
        
        it('should validate record\'s data [string]',
            function () {
                var record = MODEL('TestModelIsValidString', 'buang'),
                    result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error === false,
                    'should be a valid [record_data:string]');
                
                record = MODEL('TestModelIsValidString', new Date());
                result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error !== false,
                    'should not be a valid [record_data:string]');
                
            });
        
        
        it('should validate record\'s data [number]',
            function () {
                var record = MODEL('TestModelIsValidNumber', 102),
                    result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error === false,
                    'should be a valid [record_data:number]');
                
                record = MODEL('TestModelIsValidNumber', new Date());
                result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error !== false,
                    'should not be a valid [record_data:number]');
                
            });
        
        
        it('should validate record\'s data [boolean]',
            function () {
                var record = MODEL('TestModelIsValidBoolean', true),
                    result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error === false,
                    'should be a valid [record_data:boolean]');
                
                record = MODEL('TestModelIsValidBoolean', [true, false]);
                result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error === false,
                    'should be a valid [record_data:boolean] since any non-empty values are converted to boolean');
                
            });
        
        
        it('should validate record\'s data [object]',
            function () {
                var record = MODEL('TestModelIsValidObject', {
                                    id: 90,
                                    name: 'cha'
                                }),
                    result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error === false,
                    'should be a valid [record_data:object]');
                
                record = MODEL('TestModelIsValidObject', [true, false]);
                result = false;
                try {
                    result = record.isValid();
                }
                catch (e) {
                    console.warn(e);
                }

                assert(result !== false,
                    'should return validation object without error');
                
                assert(result.error !== false,
                    'should not be a valid [record_data:object]');
                
            });
    });