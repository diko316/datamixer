'use strict';


describe('collection.load([data:mixed])',
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
        
        it('should accept [data:mixed] for conversion');
        
    });