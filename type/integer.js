'use strict';

var type = require('type-caster'),
    number = type('number');
    
    
    
module.exports = number.extend({
            
            cast: function (data) {
                data = number.cast(data);
                if (typeof data === 'number') {
                    return Math.round(data);
                }
                return void(0);
            }
            
        });


