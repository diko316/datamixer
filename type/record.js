'use strict';

var MANAGER = require('../manager.js'),
    MODEL = require('../model.js'),
    Base = MODEL.Model;

function cast(data) {
    /*jshint validthis:true */
    var me = this;
    var Model;
    
    finalizeModel(me);
    
    // use model type to cast data
    Model = me.config.model;
    
    // return model
    if (data instanceof Model) {
        return data;
    }
    // instantiate
    else if (!(data instanceof Base) &&
        !Model.prototype['@type'].validate(data).error) {
        return new Model(data);
    }
   
    return void(0);
}

function validate(state, data) {
    /*jshint validthis:true */
    var me = this;
    var Model, validation, name, hasOwn;
    
    finalizeModel(me);

    Model = me.config.model;
    
    if (data instanceof Base) {
        if (data instanceof Model) {
            state.error = false;
        }
        else {
            state.error.model = 'Invalid instance of ' +
                                    Model.prototype['@model'];
        }
    }
    else {
        validation = Model.prototype['@type'].validate(data);
        hasOwn = Object.prototype.hasOwnProperty;
        for (name in validation) {
            if (hasOwn.call(validation, name)) {
                state[name] = validation[name];
            }
        }
    }

}

function model(name) {
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
    cast: cast,
    validate: validate,
    model: model
};