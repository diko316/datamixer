'use strict';

describe('DATAMIXER.collection',
    function () {
        
        var MODEL = use('index.js'),
            TYPE = MODEL.type;
        
        MODEL.define('TestCollectionRecord', {
            type: TYPE('object').
                        schema({
                            id: 'number',
                            name: 'string'
                        })
        });
        
        require('./default.js');
        require('./is.js');
        
        describe('Collection API',
            function () {
                
                require('./Collection/load.js');
                
            });
        
    });