'use strict';

describe('"text" TYPE',
    function () {
        
        var TYPE = use('index').type,
            TEXT = TYPE('text').pattern(/^[a-z]+$/);
        
         // cast()
        describe('cast(data:string) method',
            function () {
                it('should apply string.cast(data) and convert [data:string] if valid string matches the configured pattern',
                    function () {
                        
                        assert(TEXT.cast('aBc') === void(0),
                            'should convert non-matching [data:string] to undefined');
                        
                        assert(TEXT.cast('acdef') === 'acdef',
                            'should return converted [data:string] that matches with the given pattern');
                    });
            });
        
        describe('validate(data:string) method',
            function () {
                it('should validate [data:string] if valid string matches the configured pattern',
                    function () {
                        var valid = TEXT.validate('aBc');
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error !== false,
                            'should not be valid if [data:string] do not match with pattern');
                        
                        valid = TEXT.validate('abdecz');
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation object');
                        
                        assert(valid.error === false,
                            'should be valid if [data:string] matches with pattern');
                    });
            });
        
    });

