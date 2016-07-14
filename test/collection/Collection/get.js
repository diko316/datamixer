'use strict';


describe('collection.get([data:string|number]):mixed',
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
            STRINGKEY_SAMPLE_DATA = [{
                id: 'id1',
                name: 'diko'
            },{
                id: 'id2',
                name: 'cha'
            }],
            STRINGKEY_RECORDS = COLLECTION('TestCollectionRecordStringKey', STRINGKEY_SAMPLE_DATA),
            RECORDS = COLLECTION('TestCollectionRecord', SAMPLE_DATA);
        
        it('should accept [data:string] collection key and returns the record',
            function () {
                var record = false,
                    collection = STRINGKEY_RECORDS;
                
                try {
                    record = collection.get('id2');
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(record !== false,
                    'should return record from collection without errors');
                
                assert(record instanceof collection['@model'],
                    'should return record which is an instance of Model');
                
                assert(record.valueOf().id === 'id2',
                    'should return the correct record indexed by id');
                
            });
        
        it('should accept [data:number] collection key and returns the record',
            function () {
                var record = false,
                    collection = RECORDS;
                
                try {
                    record = collection.get(1);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(record !== false,
                    'should return record from collection without errors');
                
                assert(record instanceof collection['@model'],
                    'should return record which is an instance of Model');
                
                assert(record.valueOf().id === 1,
                    'should return the correct record indexed by id');
                
            });
        
    });