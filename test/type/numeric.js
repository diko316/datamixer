'use strict';


describe('"numeric" TYPE',
    function () {
        var TYPE = use('index.js').type,
            NUMERIC = TYPE('numeric');
        
        describe('cast(data:string|number)',
            function () {
                it('should return the [data:string] if string is numeric',
                    function () {
                        assert(NUMERIC.cast('109.06') === '109.06',
                            'should return [data:string] float if numeric pattern');
                        assert(NUMERIC.cast('109') === '109',
                            'should return [data:string] integer if numeric pattern');
                    });
            });
        
    });