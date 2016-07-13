'use strict';

describe('DATAMIXER.collection([model:string|Model], [data:mixed])',
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

        
        it('should accept [model:string], and [data:mixed] parameter',
            function () {
                var records = false;
                try {
                    records = COLLECTION('TestCollectionRecord', SAMPLE_DATA);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(records !== false,
                    'should have created collection of records');
                
                assert(COLLECTION.is(records),
                    'should have record collection an instance of Collection');
                
                assert(records.length === 2,
                    'should have record collection containing the same length as the sample data');
                
                assert(records[0].valueOf().id === 1,
                    'should have record collection with first item having the same converted properties with the sample data');
                
                assert(records[0].valueOf().name === 'diko',
                    'should have record collection with first item having the same converted properties with the sample data');
                
                assert(records[1].valueOf().id === 2,
                    'should have record collection with second item having the same converted properties with the sample data');
                
                assert(records[1].valueOf().name === 'cha',
                    'should have record collection with second item having the same converted properties with the sample data');
            });
        
        
        it('should accept [model:Model], and [data:mixed] parameter',
            function () {
                var records = false;
                try {
                    records = COLLECTION(MODEL.get('TestCollectionRecord'), SAMPLE_DATA);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(records !== false,
                    'should have created collection of records');
                
                assert(COLLECTION.is(records),
                    'should have record collection an instance of Collection');
                
                assert(records.length === 2,
                    'should have record collection containing the same length as the sample data');
                
                assert(records[0].valueOf().id === 1,
                    'should have record collection with first item having the same converted properties with the sample data');
                
                assert(records[0].valueOf().name === 'diko',
                    'should have record collection with first item having the same converted properties with the sample data');
                
                assert(records[1].valueOf().id === 2,
                    'should have record collection with second item having the same converted properties with the sample data');
                
                assert(records[1].valueOf().name === 'cha',
                    'should have record collection with second item having the same converted properties with the sample data');
            });
        
        
    });

