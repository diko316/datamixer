'use strict';


describe('collection.indexOf([data:mixed]):number',
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
            RECORDS = COLLECTION('TestCollectionRecord', SAMPLE_DATA);
        
        it('should accept [data:mixed] collection record and returns the index order',
            function () {
                var index = false,
                    collection = RECORDS,
                    record = collection.get(2);
                
                try {
                    index = collection.indexOf(record);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(index !== false,
                    'should return order index of record from collection without errors');
                
                assert(index > -1,
                    'should return number greater than -1 if record is found');
                
                assert(record === collection[index],
                    'should return the correct order index of the record');
                
                
                assert(collection.indexOf('buang') === -1,
                    'should return -1 index if record is not found');
            });
        
    });