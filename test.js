'use strict';

var model = require('./index.js');


model.define('Session', {
    type: {
        authToken: 'string',
        role: 'string',
        user: 'User'
    },
    '@create': [
        function (data) {
            
        }]
});

