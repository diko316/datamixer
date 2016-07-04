'use strict';


var model = require('../index.js');
var geocode;

model.define('Geocode', {
    type: model.type('object'),
    
    '@get': ['http.request']
});

geocode = model('Geocode', {});

geocode.get(
    'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA'
).then(
    function (data) {
        console.log('response: ', require('util').inspect(data, { depth: 1}));
    });
    
