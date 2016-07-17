'use strict';


describe('DATAMIXER.exist([modelname:string]):boolean',
    function () {
        var MODEL = use('index.js');
        
        MODEL.define('TestExist', {
                        type: {
                                id: 'integer',
                                name: 'text'
                            },
                        '@customEvent': 'model.event.dispatch'
                    });
        
        it('should return true if Model named [modelname:string] exists',
            function () {
                assert(MODEL.exist('TestExist') === true,
                    'defined model should exist');
            });
        
        it('should return false if Model named [modelname:string] do not exists',
            function () {
                assert(MODEL.exist('TestExistNotFound') === false,
                    'undefined model should not exist');
            });
        
    });