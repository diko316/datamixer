'use strict';


describe('"integer" TYPE',
    function () {
        var TYPE = use('index.js').type,
            INTEGER = TYPE('integer');
        
        describe('cast(data:string|number)',
            function () {
                it('should convert finite [data:number] to number',
                    function () {
                        assert(INTEGER.cast(109.06) === 109,
                            'should return rounded [data:number] from float');
                        
                        assert(INTEGER.cast(109) === 109,
                            'should return [data:number] from valid integer');
                        
                        assert(INTEGER.cast(null) === void(0),
                            'should return undefined if parameter is not numeric string or finite number');
                        
                    });
            });
        
        describe('validate(data:string|number)',
            function () {
                it('should validate the [data:number] if parameter is finite number',
                    function () {
                        var valid = INTEGER.validate(109.06);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:number] float');
                        
                        valid = INTEGER.validate(109);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:number] integer');
                        
                        
                        valid = INTEGER.validate(new Date());
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error !== false,
                            'should not be a valid [data:!number] if parameter is not number or string');
                        
                    });
            });
        
    });