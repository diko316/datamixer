'use strict';

var model = require('../index.js');


model.define('Session', {
    extend: 'User',
    type: model.type('object').
                schema({
                    authToken: 'string',
                    role: 'string',
                    user: 'User'
                }).
                strict(),
    initialize: function () {
        
    },
    '@create': [
        function (data) {
            console.log(data);
        }]
});

model.define('User', {
    type: {
        id: 'number',
        name: 'string'
    }
});


console.log(model('Session', {
                                role: 'admin',
                                user: {
                                    id: 1,
                                    name: 'diko'
                                }
                            }).toString());

console.log(model('Session').toString());
