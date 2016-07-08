'use strict';

describe('"text" TYPE',
    function () {
        
        var TYPE = use('index').type,
            TEXT = TYPE('text').pattern(/^[a-z]+$/);
        
        it('should apply string.cast(data) and convert [data:string] if valid string matches the configured pattern');
        
        it('should validate [data:string] if valid string matches the configured pattern');
        
    });

