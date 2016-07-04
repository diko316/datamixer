'use strict';

var type = require('type-caster'),
    number = type('number'),
    NUMERIC_RE = /^[1-9]+[0-9]*(\.[0-9]+)?$/;

module.exports = number.extend({
            
            cast: function (data) {
                switch (typeof data) {
                case 'string':
                    if (NUMERIC_RE.test(data)) {
                        return data;
                    }
                    break;
                case 'number':
                    if (isFinite(data)) {
                        return data;
                    }
                    break;
                case 'boolean':
                    return data ? 1 : 0;
                }
                return void(0);
            },
            
            validate: function (state, data) {
                
                state.error = typeof data === 'string' &&
                                NUMERIC_RE.test(data) ?
                                    false :
                                    number.validate(data).error;
                
            }
            
        });


