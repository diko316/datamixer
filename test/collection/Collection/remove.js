'use strict';


describe('collection.remove([data:mixed]):number',
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
        
        it('should accept [data:mixed] collection record to remove',
            function () {
                var records = COLLECTION('TestCollectionRecord', SAMPLE_DATA),
                    record = records.get(3),
                    result = false;
                    
                try {
                    result = records.remove(record);
                }
                catch (e) {
                    console.warn(e);
                }
                
                assert(result !== false,
                    'should remove record without errors');
                
                assert(result !== -1,
                    'should remove return number > -1 when record was successfully removed');
                
                assert(records.get(3) !== record,
                    'should not be found when record was removed');
                
                assert(records.length === 2,
                    'should have its "length" property decremented after record has been removed');
            });
        
    });