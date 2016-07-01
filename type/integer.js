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
            },
            
            validate: function (state, data) {
                var valid = number.validate(data),
                    old = state.error,
                    error = valid.error;
                
                state.error = error;
                // must not be valid if there is a decimal point
                if (!error && data % 1 !== 0) {
                    state.error = old;
                }
                
            }
            
        });


