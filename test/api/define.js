'use strict';

var assert = require('chai').assert;

describe('datamixer.define() method should define named model',
    function () {
        
        var Model = use("index"),
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
                    returned = Model.define(modelName, modelConfig);
                }
                catch (e) {
                    fail = e;
                }
                
                assert.strictEqual(fail, false,
                       '[name] and [config] parameters are invalid');
                
                assert.strictEqual(returned, Model,
                       'should return Model() for chaining calls');
                
            });
        
        it('should not clash with already defined model',
            function () {
                var fail = false;
                try {
                    Model.define(modelName, modelConfig);
                }
                catch (e) {
                    fail = e;
                }
                
                assert.notStrictEqual(
                            fail,
                            false,
                            'must not redefine [Session]');
            });
        
        it('should be named with model name pattern /^[A-Z][a-z0-9\-\_]+$/',
            function () {
                var fail = false;
                try {
                    Model.define('modelName', modelConfig);
                }
                catch (e) {
                    fail = e;
                }
                assert.notStrictEqual(
                            fail,
                            false,
                            'must match with pattern /^[A-Z][a-z0-9\-\_]+$/');
            });
        
        
    });