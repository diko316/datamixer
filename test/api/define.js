'use strict';

describe('DATAMIXER.define([name:string], [config:object]):object method',
    function () {
        
        var MODEL = use("index"),
            modelName = 'TestModel',
            modelConfig = {
                '@create': [
                    function (data) {
                        return data;
                    }]
            };
        
        it('should accept string [name] and object [config] parameters' +
           ' and returns Model() for chaining calls',
            function () {
                var fail = false;
                var returned = false;
                try {
                    returned = MODEL.define(modelName, modelConfig);
                }
                catch (e) {
                    fail = e;
                }
                
                assert(fail === false,
                       'should have valid [name:string] and [config:object] parameters');
                
                assert(returned === MODEL,
                       'should return Model() for chaining calls');
                
                
                fail = false;
                try {
                    MODEL.define('TestModel1', true);
                }
                catch (e) {
                    fail = e;
                }
                
                assert(fail !== false,
                       'should not define model having invalid [config:object] paramter');
                
                fail = false;
                try {
                    MODEL.define('TestModel1', 'config');
                }
                catch (e) {
                    fail = e;
                }
                
                assert(fail !== false,
                       'should not define model having invalid [config:object] paramter');
            });
        
        it('should not clash with already defined model',
            function () {
                var fail = false;
                try {
                    MODEL.define(modelName, modelConfig);
                }
                catch (e) {
                    fail = e;
                }
                
                assert(fail !== false,
                    'must not redefine [Session]');
            });
        
        it('should be named with model name pattern /^[A-Z][a-z0-9\-\_]+$/',
            function () {
                var fail = false;
                try {
                    MODEL.define('modelName', modelConfig);
                }
                catch (e) {
                    fail = e;
                }
                assert(fail !== false,
                    'must match with pattern /^[A-Z][a-z0-9\-\_]+$/');
            });
        
        
    });