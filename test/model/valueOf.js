'use strict';

describe('Model.prototype.valueOf((optional: raw:boolean)):mixed',
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
        it('should return record\'s data [string]',
            function () {
                var record = MODEL('TestModelValueOfString', 'buang'),
                    result = false;
                try {
                    result = record.valueOf();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record data without error');
                
                assert(result === 'buang',
                    'should return string record data same as record value');
                
                record = MODEL('TestModelValueOfString', 109);
                result = false;
                try {
                    result = record.valueOf();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record data without error');
                
                assert(result === '109',
                    'should return string record data converted from record value');
                
                result = false;
                try {
                    result = record.valueOf(true);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record data without error');
                
                assert(result === 109,
                    'should return raw record data from instantiation record\'s value');
                
            });
        
        it('should return record\'s data [number]',
            function () {
                var record = MODEL('TestModelValueOfNumber', 990),
                    result = false;
                try {
                    result = record.valueOf();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record data without error');
                
                assert(result === 990,
                    'should return number record data same as record value');
                
                record = MODEL('TestModelValueOfNumber', '990');
                result = false;
                try {
                    result = record.valueOf();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record data without error');
                
                assert(result === 990,
                    'should return number record data converted from record value');
                
                result = false;
                try {
                    result = record.valueOf(true);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should return record data without error');
                
                assert(result === '990',
                    'should return raw record data from instantiation record\'s value');
                
            });
        
        it('should return record\'s data [boolean]',
            function () {
                var record = MODEL('TestModelValueOfBoolean', true),
                    result = null;
                try {
                    result = record.valueOf();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== null,
                    'should return record data without error');
                
                assert(result === true,
                    'should return boolean record data same as record value');
                
                record = MODEL('TestModelValueOfBoolean', 'false');
                result = null;
                try {
                    result = record.valueOf();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== null,
                    'should return record data without error');
                
                assert(result === false,
                    'should return boolean record data converted from record value');
                
                result = null;
                try {
                    result = record.valueOf(true);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== null,
                    'should return record data without error');
                
                assert(result === 'false',
                    'should return raw record data from instantiation record\'s value');
                
            });
        
        it('should return record\'s data [object]',
            function () {
                var raw = {
                            id: 5,
                            name: 'buang'
                        },
                    record = MODEL('TestModelValueOfObject', raw),
                    result = null;
                
                try {
                    result = record.valueOf();
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== null,
                    'should return record data without error');
                
                assert(Object.prototype.toString.call(result) === '[object Object]',
                    'should return object record data same as record value');
                
                assert(result.id === 5,
                    'should return object record data same as record value');
                
                assert(result.name === 'buang',
                    'should return object record data same as record value');
                
                result = null;
                try {
                    result = record.valueOf(true);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== null,
                    'should return record data without error');
                
                assert(result === raw,
                    'should return raw record data from instantiation record\'s value');
                
            });
    });