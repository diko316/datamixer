'use strict';

var COLLECTION = require('../collection.js'),
    INSTANTIATE = require('../instantiate.js'),
    MODEL = require('../model.js');

function finalizeModel(typeInstance) {
    var Model = MODEL,
        config = typeInstance.config,
        name = config.model;
        
    if (typeInstance.$$mustFinalizeModel) {
        if (typeof name === 'string' && INSTANTIATE.exist(name)) {
            config.model = name = MODEL.get(name);
        }
        
        delete typeInstance.$$mustFinalizeModel;
    
    }
    
    if (!Model.is(name)) {
        throw new Error('unable to find Model [' + name + ']');
    }
    
}

module.exports = {
    config: {
        model: void(0)
    },
    '@clone': function (target, superClone) {
        var config = this.config,
            targetConfig = target.config;
            
        superClone();
        
        targetConfig.model = config.model;
        
    },
    cast: function (data) {
        
        finalizeModel(this);
        
        if (!this.validate(data).error) {
            
            return COLLECTION(this.config.model, data);
        
        }
        
        return null;
    },
    
    validate: function (state, data) {
        var Model, Base, l, item, type;
        
        finalizeModel(this);
        Base = this.config.model;
        
        if (COLLECTION.is(data)) {
            Model = data['@model'];
           
            if (Model === Base || Model.prototype instanceof Base) {
                state.error = false;
            }
            else {
                state.error.model = 'collection is incompatible with record model';
            }

        }
        else if (data instanceof Array) {
            type = Base.prototype['@type'];
            for (l = data.length; l--;) {
                valid = type.validate(data);
                if (valid.error) {
                    state.error = valid.error;
                    state.blame[0] = l;
                    return;
                }
            }
            state.error = false;
        }
    },
    
};