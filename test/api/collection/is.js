'use strict';


describe('DATAMIXER.collection.is([data:Collection])',
    function () {
        
        var MODEL = use('index.js'),
            COLLECTION = MODEL.collection,
            SAMPLE_DATA = [{
                id: 1,
                name: 'diko'
            },{
                id: 2,
                name: 'cha'
            }],
            records = COLLECTION('TestCollectionRecord', SAMPLE_DATA);
            
        it('should accept [data:Collection] parameter',
            function () {
                
                assert(COLLECTION.is(records) === true,
                    'should return true if parameter is an instance of Collection');
                
                assert(COLLECTION.is(null) === false,
                    'should return false if parameter is not an instance of Collection');
                
                assert(COLLECTION.is(void(0)) === false,
                    'should return false if parameter is not an instance of Collection');
                
                assert(COLLECTION.is(1) === false,
                    'should return false if parameter is not an instance of Collection');
                
                assert(COLLECTION.is('integer') === false,
                    'should return false if parameter is not an instance of Collection');
                
                assert(COLLECTION.is(new Date()) === false,
                    'should return false if parameter is not an instance of Collection');
            });
        
    });