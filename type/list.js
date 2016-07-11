'use strict';

var COLLECTION = require('../collection.js'),
    MANAGER = require('../manager.js'),
    MODEL = require('../model.js');

function finalizeModel(typeInstance) {
    var Model = MODEL,
        config = typeInstance.config,
        name = config.model;
        
    if (typeInstance.$$mustFinalizeModel) {
        if (typeof name === 'string' && MANAGER.exist(name)) {
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
        var O = Object.prototype;
        var Model, Base, l, type, valid, hasOwn;
        
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
        else if (O.toString.call(data) === '[object Object]') {
            type = Base.prototype['@type'];
            hasOwn = O.hasOwnProperty;
            for (l in data) {
                if (hasOwn.call(data, l)) {
                    valid = type.validate(data[l]);
                    if (valid.error) {
                        state.error = valid.error;
                        state.blame[0] = l;
                        return;
                    }
                }
            }
            state.error = false;
        }
        else if (data instanceof Array) {
            type = Base.prototype['@type'];
            for (l = data.length; l--;) {
                valid = type.validate(data[l]);
                if (valid.error) {
                    state.error = valid.error;
                    state.blame[0] = l;
                    return;
                }
            }
            state.error = false;
        }
    },
    
    model: function (name) {
        if (name) {
            if (typeof name === 'string') {
                /*jshint validthis:true */
                this.$$mustFinalizeModel = true;
                return name;
            }
            else if (MODEL.is(name)) {
                return name;
            }
            else {
                throw new Error('invalid model parameter [' + name + ']');
            }
        }
        return void(0);
    }
    
};