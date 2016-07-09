'use strict';

module.exports = {
    '@config': {
        options: [],
        min: 0,
        max: 0
    },
    
    '@clone': function (target, superClone) {
        var config = this.config,
            targetConfig = target.config;
            
        superClone();
        
        targetConfig.options = config.options.slice(0);
        
    },
    
    options: function (options) {
        if (options instanceof Array) {
            return options.slice(0);
        }
        return this.config.options;
    },
    
    cast: function (data) {
        
        var options = this.config.options;
        var l = options.length;
        
        for (; l--;) {
            if (options[l] === data) {
                return data;
            }
        }
        
        return void(0);
        
    },
    
    validate: function (state, data) {
        
        var options = this.config.options;
        var l = options.length;
        
        for (; l--;) {
            if (options[l] === data) {
                state.error = false;
                break;
            }
        }
        
    }
};