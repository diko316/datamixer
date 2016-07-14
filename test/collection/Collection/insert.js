'use strict';


describe('collection.insert([data:mixed] (, optional: [index:number] (, optional: [custom_id:number|string]))):Model',
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
        
        it('should accept [data:mixed|Model] collection record or raw data and returns the inserted record',
            function () {
                
                var collection = RECORDS,
                    sampleRecord = {
                        id: 101,
                        name: 'another user'
                    },
                    sampleRecord2 = {
                        id: 106,
                        name: 'another user id:106'
                    },
                    result = false;
                
                try {
                    result = collection.insert(sampleRecord, 1);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should successfully insert record without errors');
                
                assert(result instanceof collection['@model'],
                    'should return inserted record');
                
                assert(collection.indexOf(result) === 1,
                    'should insert record at the given index order (second parameter)');
                
                
                try {
                    result = collection.insert(sampleRecord2, 2, 'newId');
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should successfully insert record without errors');
                
                assert(result instanceof collection['@model'],
                    'should return inserted record');
                
                assert(collection.indexOf(result) === 2,
                    'should insert record at the given index order (second optinal parameter)');
                
                assert(collection.get('newId') === result,
                    'should return inserted record with custom id (third optinal parameter)');
            });
        
    });