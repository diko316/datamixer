'use strict';

describe('"list" TYPE',
    function () {
        var MANAGER = use('index.js'),
            TYPE = MANAGER.type,
            LIST = TYPE('list').model('ListRecord');
        
        MANAGER.define('ListRecord', {
                type: TYPE('object').
                        schema({
                            id: TYPE('number').required(),
                            name: 'string'
                        })
            });
        
        describe('cast([data:array|object|Collection(Model)])',
            function () {
                it('should convert [data:array] to [data:Collection]',
                    function () {
                        var list = LIST.cast([{
                                id: 1,
                                name: 'diko'
                            },{
                                id: 101,
                                name: 'test'
                            }]);

                        assert(!LIST.validate(list).error,
                            'should be valid [record:Collection(ListRecord)]');
                        
                        assert(list.access[0] === 1,
                            'should be valid [record:ListRecord] key');
                        
                        assert(list[0] instanceof LIST.config.model,
                            'should be valid [record:ListRecord] item');
                        
                        assert(list.access[1] === 101,
                            'should be valid [record:ListRecord] key');
                        
                        assert(list[1] instanceof LIST.config.model,
                            'should be valid [record:ListRecord] item');
                    });
                
                it('should convert [data:object] to [data:Collection]',
                    function () {
                        var list = LIST.cast({
                                    'diko': {
                                        id: 1,
                                        name: 'diko'
                                    },
                                    'test': {
                                        id: 101,
                                        name: 'test'
                                    }
                                });

                        assert(!LIST.validate(list).error,
                            'should be valid [record:Collection(ListRecord)]');
                        
                        assert(list.access[0] === 'diko',
                            'should be valid [record:ListRecord] key');
                        
                        assert(list[0] instanceof LIST.config.model,
                            'should be valid [record:ListRecord] item');
                        
                        assert(list.access[1] === 'test',
                            'should be valid [record:ListRecord] key');
                        
                        assert(list[1] instanceof LIST.config.model,
                            'should be valid [record:ListRecord] item');
                    });
                
                it('should convert [data:Collection(Model)] to [data:Collection]',
                    function () {
                        var list = LIST.cast({
                                    'diko': {
                                        id: 1,
                                        name: 'diko'
                                    },
                                    'test': {
                                        id: 101,
                                        name: 'test'
                                    }
                                }),
                            list2 = LIST.cast(list);

                        assert(!LIST.validate(list2).error,
                            'should be valid [record:Collection(ListRecord)]');
                        
                        assert(list2.access[0] === 'diko',
                            'should be valid [record:ListRecord] key');
                        
                        assert(list2[0] instanceof LIST.config.model,
                            'should be valid [record:ListRecord] item');
                        
                        assert(list2.access[1] === 'test',
                            'should be valid [record:ListRecord] key');
                        
                        assert(list2[1] instanceof LIST.config.model,
                            'should be valid [record:ListRecord] item');
                    });
            });
        
        
        describe('validate([data:array|object|Collection(Model)])',
            function () {
                it('should be a valid [data:Collection] array',
                    function () {
                        var valid = LIST.validate([{
                                id: 1,
                                name: 'diko'
                            },{
                                id: 101,
                                name: 'test'
                            }]);
                        
                        assert(valid.error === false,
                            'should be a valid [data:Collection] array parameter');

                    });
                it('should be a valid [data:Collection] object',
                    function () {
                        var valid = LIST.validate({
                                    'diko': {
                                        id: 1,
                                        name: 'diko'
                                    },
                                    'test': {
                                        id: 101,
                                        name: 'test'
                                    }
                                });
                        
                        assert(valid.error === false,
                            'should be a valid [data:Collection] object parameter');
                        
                    });
                it('should be a valid [data:Collection] Collection(Model)',
                    function () {
                        
                        var list = LIST.cast({
                                    'diko': {
                                        id: 1,
                                        name: 'diko'
                                    },
                                    'test': {
                                        id: 101,
                                        name: 'test'
                                    }
                                }),
                            valid = LIST.validate(list);
                        
                        assert(valid.error === false,
                            'should be a valid [data:Collection] Collection parameter');
                    });
            });
    });