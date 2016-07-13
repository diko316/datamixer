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
        
        MODEL.define('TestCollectionRecordStringKey', {
            type: TYPE('object').
                        schema({
                            id: 'string',
                            name: 'string'
                        })
        });
        
        require('./default.js');
        require('./is.js');
        
        describe('Collection API',
            function () {
                
                require('./Collection/load.js');
                require('./Collection/get.js');
                require('./Collection/indexOf.js');
                require('./Collection/insert.js');
                require('./Collection/remove.js');
                require('./Collection/removeAt.js');
                
            });
        
    });