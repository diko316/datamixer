'use strict';


describe('Model([data:mixed]):Model or new Model([data:mixed]):Model',
    function () {
        var Model = use('index.js').get('TestModel'),
            sample = [{
                    id: 3,
                    name: 'diko'
                },
                {
                    id: 68,
                    name: 'cha'
                },
                {
                    id: 75,
                    name: 'ate aerin'
                }];
            
        it('should instantiate Model using "new" keyword',
            function () {
                var record = false;
                
                try {
                    record = new Model(sample);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(record !== false,
                    'should instantiate Model without errors');
                
                assert(record instanceof Model,
                    'should return a Model instance');
            });
        
        it('should instantiate Model without using "new" keyword',
            function () {
                var record = false;
                
                try {
                    record = Model(sample);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(record !== false,
                    'should instantiate Model without errors');
                
                assert(record instanceof Model,
                    'should return a Model instance');
            });
        
        
        
    });