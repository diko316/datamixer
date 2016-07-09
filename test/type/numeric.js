'use strict';


describe('"numeric" TYPE',
    function () {
        var TYPE = use('index.js').type,
            NUMERIC = TYPE('numeric');
        
        describe('cast(data:string|number)',
            function () {
                it('should convert finite [data:number] to number',
                    function () {
                        assert(NUMERIC.cast(109.06) === 109.06,
                            'should return [data:number] when valid float');
                        
                        assert(NUMERIC.cast(109) === 109,
                            'should return [data:number] when valid integer');
                        
                        assert(NUMERIC.cast(null) === void(0),
                            'should return undefined if parameter is not numeric string or finite number');
                        
                    });
                
                it('should convert numeric [data:string] number',
                    function () {
                        assert(NUMERIC.cast('109.06') === '109.06',
                            'should return [data:string] float if numeric pattern');
                        assert(NUMERIC.cast('109') === '109',
                            'should return [data:string] integer if numeric pattern');
                        
                        assert(NUMERIC.cast('#test') === void(0),
                            'should return undefined if string is not numeric');
                        
                        assert(NUMERIC.cast('90%') === void(0),
                            'should return undefined if string is not numeric');
                    });
            });
        
        describe('validate(data:string|number)',
            function () {
                it('should validate the [data:string] if string parameter is numeric',
                    function () {
                        var valid = NUMERIC.validate('109.06');
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid numeric [data:string] float');
                        
                        valid = NUMERIC.validate('109');
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid numeric [data:string] integer');
                        
                        
                        valid = NUMERIC.validate('#buang');
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error !== false,
                            'should not be a valid numeric [data:string] if string is numeric');
                        
                    });
                
                it('should validate the [data:number] if parameter is finite number',
                    function () {
                        var valid = NUMERIC.validate(109.06);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:number] float');
                        
                        valid = NUMERIC.validate(109);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:number] integer');
                        
                        
                        valid = NUMERIC.validate(new Date());
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error !== false,
                            'should not be a valid [data:![string|number]] if parameter is not number or string');
                        
                    });
            });
        
    });