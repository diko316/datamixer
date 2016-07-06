'use strict';

describe('datamixer(name, defaultValue) default method',
    function () {
        
        var assert = require('chai').assert,
            MODEL = use("index.js"),
            defaultValue = {
                authToken: '00authtoken01',
                role: 'admin',
                userId: 101
            };
        
        MODEL.define('Session', {
                type: Model.type('object').
                        schema({
                            authToken: 'string',
                            role: 'string',
                            userId: 'integer'
                        }),
                '@create': [
                    function (data) {
                        return data;
                    }]
            });
        
        it('should accept [name] string and' +
           ' [defaultValue] mixed type parameters.' +
           ' then returns an instance of Model.',
            function () {
                var session = MODEL('Session', defaultValue),
                    raw = session.valueOf(true),
                    data = session.valueOf();
                
                assert(session instanceof MODEL.Class,
                    'returned object must be an instance of Model');
                
                assert(raw.authToken === data.authToken,
                    'authToken should be consistent string');
                
                assert(raw.role === data.role,
                    'role should be consistent string');
                
                assert(raw.userId === data.userId,
                    'userId should be consistent integer');
                
            });
        
        
        
    });