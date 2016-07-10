'use strict';

describe('"record" TYPE',
    function () {
        
        var MODEL = use('index.js'),
            Model = use('model.js').Model,
            TYPE = MODEL.type,
            RECORD = TYPE('record').
                        model('Record'),
            SUBRECORD = TYPE('record').
                            model('Subrecord');
        
        
        MODEL.define('Record', {
                type: TYPE('object').
                        schema({
                            id: 'number',
                            name: 'string'
                        })
            });
        
        MODEL.define('Subrecord', {
                type: TYPE('object').
                        schema({
                            id: 'number',
                            role: 'string',
                            record: 'Record'
                        })
            });
        
        describe('cast([data:mixed])',
            function () {
                
                it('should convert [data:mixed] to an instance of Model',
                    function () {
                        var baseRecord = RECORD.cast({
                                id: 1,
                                name: 'buang'
                            }),
                        
                            subRecord = SUBRECORD.cast({
                                    id: 1,
                                    role: 'buang',
                                    record: {
                                        id: 2,
                                        name: 'sub'
                                    }
                                });
                            
                        assert(MODEL.is(baseRecord),
                            'should convert to instance of Model');
                        
                        assert(MODEL.is(subRecord),
                            'should convert to instance of Model and resolves sub record');
                        
                        assert(SUBRECORD.cast(subRecord) === subRecord,
                            'should return Model instance if parameter is an instance of the model');
                        
                        assert(RECORD.cast(subRecord) === void(0),
                            'should convert to undefined if Model instance is not an instance of defined Model');
                        
                        assert(SUBRECORD.cast({
                                    id: 1,
                                    role: 'buang',
                                    record: 'diko'
                                }) === void(0),
                            'should convert to undefined if [data:mixed] cannot be validated');

                    });
                
            });
        
        describe('validate([data:mixed])',
            function () {
                
                it('should validate [data:mixed] to an instance of Model',
                    function () {
                        var subRecord = SUBRECORD.cast({
                                    id: 1,
                                    role: 'buang',
                                    record: {
                                        id: 2,
                                        name: 'sub'
                                    }
                                }),
                            valid = RECORD.validate({
                                        id: 1,
                                        name: 'buang'
                                    });
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:mixed] if it can be cast as Model instance');
                        
                        valid = SUBRECORD.validate({
                                    id: 1,
                                    role: 'buang',
                                    record: {
                                        id: 2,
                                        name: 'sub'
                                    }
                                });
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid [data:mixed] if it can be cast as Model instance');
                        
                        
                        valid = SUBRECORD.validate(subRecord);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error === false,
                            'should be a valid Model instance if it is an instance of defined Model');
                        
                        
                        valid = RECORD.validate(subRecord);
                        
                        assert(Object.prototype.toString.call(valid) === '[object Object]',
                            'should return validation result object');
                        
                        assert(valid.error !== false,
                            'should not be a valid Model instance if it is not an instance of defined Model');

                    });
                
            });
    });