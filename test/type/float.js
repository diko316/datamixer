'use strict';

describe('"float" TYPE',
    function () {
        var TYPE = use('index.js').type,
            FLOAT = TYPE('float'),
            FLOAT6 = FLOAT.precision(6);
        
        describe('cast(data:number)',
            function () {
                
                it('should convert [data:number] to string with decimal places according to configured precision (default: 2)',
                    function () {
                        assert(typeof FLOAT.cast(9) === 'string',
                            'should convert [data:number] to string with default 2 decimal places');
                        
                        assert(FLOAT.cast(9) === '9.00',
                            'should convert [data:number] to string with default 2 decimal places');
                    });
                
                it('should convert [data:number] to string with decimal places according to configured precision (configured: 6)',
                    function () {
                        assert(typeof FLOAT6.cast(9) === 'string',
                            'should convert [data:number] to string with default 2 decimal places');
                        
                        assert(FLOAT6.cast(9) === '9.000000',
                            'should convert [data:number] to string with configured 6 decimal places');
                    });
                
            });
        
        describe('validate(data:number)',
            function () {
                
                it('should validate finite [data:number] regardless of decimal places precision',
                    function () {
                        var valid = FLOAT.validate(109.06);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:number] float');
                        
                        valid = FLOAT.validate(109);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:number] integer');
                    });
                
                it('should not validate [data:!number] regardless of decimal places precision',
                    function () {
                        
                        var valid = FLOAT.validate(null);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error !== false,
                            'should not be a valid [data:number] float');
                    });
                
            });
        
    });