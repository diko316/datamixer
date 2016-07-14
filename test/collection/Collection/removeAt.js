'use strict';


describe('collection.removeAt([data:number]):Model',
    function () {
        
        var COLLECTION = use('index.js').collection,
            SAMPLE_DATA = [{
                id: 1,
                name: 'diko'
            },{
                id: 3,
                name: 'cha'
            },{
                id: 5,
                name: 'aerin'
            }];
            
        it('should accept [data:number] collection record index order to be removed',
            function () {
                var records = COLLECTION('TestCollectionRecord', SAMPLE_DATA),
                    record = records.get(3),
                    index = records.indexOf(record),
                    result = false;
                    
                try {
                    result = records.removeAt(index);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should remove record without errors');
                
                assert(result === record,
                    'should return collection record after it was successfully removed');
                
                assert(records.get(index) !== record,
                    'should not be found when record was removed');
                
                assert(records.length === 2,
                    'should have its "length" property decremented after record has been removed');
            });
        
    });