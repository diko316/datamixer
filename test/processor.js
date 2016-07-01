'use strict';


var model = require('../index.js');
var session;


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
            console.log('method:', this.$processing);
            console.log(data);
            return data;
        },
        'event.dispatch'],
});


model.define('User', {
    type: {
        id: 'number',
        name: 'string'
    }
});

session = model('Session', {
                            role: 'admin',
                            user: {
                                id: 1,
                                name: 'diko'
                            }
                        });


model.subscribe('Session:create',
    function () {
        console.log('Session:create', arguments);
    });


session.create({ name: "buang" });



