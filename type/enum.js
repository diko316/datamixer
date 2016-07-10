'use strict';

var IMMUTABLE = require('immutable');



module.exports = {
    '@config': {
        options: []
    },
    
    '@clone': function (target, superClone) {
        var config = this.config,
            targetConfig = target.config;
            
        superClone();
        
        targetConfig.options = config.options.slice(0);
        
    },
    
    cast: function (data) {
        
        var options = this.config.options,
            l = options.length,
            Immutable = IMMUTABLE,
            idata = Immutable.fromJS(data);
        for (; l--;) {
            if (Immutable.is(options[l], idata)) {
                return data;
            }
        }
        
        return void(0);
        
    },
    
    validate: function (state, data) {
        
        var options = this.config.options,
            l = options.length,
            Immutable = IMMUTABLE,
            idata = Immutable.fromJS(data);
        
        for (; l--;) {
            if (Immutable.is(options[l], idata)) {
                state.error = false;
                break;
            }
        }
        
    },
    
    options: function (options) {
        var Immutable = IMMUTABLE;
        var l;
        
        if (options instanceof Array) {
            options = options.slice(0);
            for (l = options.length; l--;) {
                options[l] = Immutable.fromJS(options[l]);
            }
            return options;
        }
        return this.config.options;
    }
};