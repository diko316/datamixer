'use strict';
var type = require('type-caster'),
    string = type('string');

module.exports = string.extend({
    '@config': {
        pattern: /^.*$/
    },
    
    '@clone': function (target, superClone) {
        var config = this.config,
            targetConfig = target.config;
        
        superClone();
        
        targetConfig.pattern = config.pattern;
        
    },
    
    cast: function (value) {
        value = string.cast(value);
        
        if (this.config.pattern.test(value)) {
            return value;
        }
        return void(0);
    },
    
    validate: function (state, value) {
        
        var valid = string.validate(value);
        
        if (!valid.error && this.config.pattern.test(value)) {
            state.error = false;
        }
        else {
            state.error = valid.error;
        }
        
    },
    
    pattern: function (pattern) {
        var config = this.config;
        switch (Object.prototype.toString.call(pattern)) {
        case '[object String]':
            try {
                return new RegExp(pattern);
            }
            catch (e) {}
            break;
        case '[object RegExp]':
            return pattern;
        }
        return config.pattern;
    }
    
});