'use strict';

var type = require('type-caster'),
    number = type('number');
    
// count digits Math.log(-99) * Math.LOG10E + 1 | 0
    
module.exports = number.extend({
    
            '@config': {
                precision: 2,
            },
            
            '@clone': function (target, superClone) {
                var config = this.config,
                    targetConfig = target.config;
                
                superClone();
                
                targetConfig.precision = config.precision;
                
            },
            
            cast: function (data) {
                var precision = this.config.precision;
                
                data = number.cast(data);
                if (typeof data === 'number') {
                    return precision ?
                                data.toFixed(precision) : data.toString(10);
                }
                return void(0);
            },
            
            precision: function (places) {
                if (typeof places === 'number' && isFinite(places)) {
                    return Math.max(places, 0);
                }
                return this.config.precision;
            }
            
        });


