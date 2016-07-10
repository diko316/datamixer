'use strict';


describe('"enum" TYPE',
    function () {
        
        var DATEOPTION = new Date(),
            ENUM = use('index.js').type('enum').
                                        options([
                                            'test',
                                            100,
                                            DATEOPTION
                                        ]);
        
        describe('cast([data:mixed])',
            function () {
                
                it('should return [data:mixed] if it exist as one of its options',
                    function () {
                        
                        assert(ENUM.cast('test') === 'test',
                            'should convert string if it has the string as one of its option');
                        
                        assert(ENUM.cast(100) === 100,
                            'should convert number if it has the number as one of its option');
                        
                        assert(ENUM.cast(DATEOPTION) === DATEOPTION,
                            'should convert date if it has the date as one of its option');
                    });
                
                it('should convert [data:mixed] parameter to  undefined if it doesn\'t exist as one of its options',
                    function () {
                        
                        assert(ENUM.cast(new Date()) === void(0),
                            'should convert date to undefined if it doesn\'t exist as one of its option');
                        
                        assert(ENUM.cast(101) === void(0),
                            'should convert number to undefined if it doesn\'t exist as one of its option');
                        
                        assert(ENUM.cast('test1') === void(0),
                            'should convert string to undefined if it doesn\'t exist as one of its option');
                    });
                
            });
        
        describe('validate([data:mixed])',
            function () {
                
                it('should be valid [data:mixed] if it exist as one of its options',
                    function () {
                        var valid = ENUM.validate('test');
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:string] if it has the string as one of its option');
                        
                        valid = ENUM.validate(100);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:number] if it has the number as one of its option');
                        
                        
                        valid = ENUM.validate(DATEOPTION);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:date] if it has the date as one of its option');
                    });
                
                it('should not be valid [data:mixed] if it doesn\'t exist as one of its options',
                    function () {
                        var valid = ENUM.validate('test1');
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error !== false,
                            'should not be a valid [data:string] if it has the string as one of its option');
                        
                        valid = ENUM.validate(101);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error !== false,
                            'should not be a valid [data:number] if it has the number as one of its option');
                        
                        
                        valid = ENUM.validate(new Date());
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error !== false,
                            'should not be a valid [data:date] if it has the date as one of its option');
                    });
                
            });
        
    });