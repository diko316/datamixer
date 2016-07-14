'use strict';


describe('collection.load([data:mixed]):Collection',
    function () {
        
        var MODEL = use('index.js'),
            COLLECTION = MODEL.collection,
            SAMPLE_DATA = [{
                id: 1,
                name: 'diko'
            },{
                id: 2,
                name: 'cha'
            }];
        
        it('should accept [data:mixed] parameter for conversion and loads data into collection',
            function () {
                var records = COLLECTION('TestCollectionRecord', []),
                    result = false,
                    error = '';
                
                try {
                    result = records.load(SAMPLE_DATA);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should sucessfully load valid sample data');
                
                assert(COLLECTION.is(result),
                    'should return collection instance of chaining calls');
                
                assert(result[0] instanceof records['@model'],
                    'should have at least one record inserted to collection');
                
                assert(result[1] instanceof records['@model'],
                    'should have inserted second record to collection');
                
                assert(records.length === 2,
                    'should have its "length" property set to current records inserted');
                
            });
        
    });