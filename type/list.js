'use strict';

var type = require('type-caster'),
    array = type('array');
    
    


module.exports = array.extend({
    itemTypes: function (types) {
        var me = this,
            caster = me.$type;
        var l, type, casters;
        
        if (typeof types === 'string' || caster.is(types)) {
            types = [types];
        }
        
        if (types instanceof Array) {
            casters = [];
            for (l = types.length; l--;) {
                type = types[l];
                if (!type ||
                    (typeof type !== 'string' && !caster.is(type))) {
                    throw new Error('item in itemTypes is invalid');
                }
                casters[l] = type;
            }
            me.$$newItemTypes = true;
            return casters;
        }
        return me.config.itemTypes;
    }
});