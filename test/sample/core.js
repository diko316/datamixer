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
            console.log('check!');
            console.log(this);
            console.log(data);
            console.log('end check!');
            return data;
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

model('Session').create({name: 'shit'}).then(function (data) {
    console.log('data passed');
    console.log(data);
   return data;
});
