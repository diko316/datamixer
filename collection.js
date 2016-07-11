'use strict';

var EXPORTS = create,
    INSTANTIATE = require('./instantiate.js'),
    MODEL = require('./model.js'),
    A = Array.prototype;

function empty() {
    
}

function create(model, items) {
    var modelMgr = MODEL;
    var Constructor;
    
    if (model instanceof Collection) {
        return new (model.constructor)(items);
    }
    else if (typeof model === 'string' && INSTANTIATE.exist(model)) {
        model = modelMgr.get(model);
    }
    
    if (modelMgr.is(model)) {
        Constructor = extend(Collection, model);
        return new Constructor(items);
    }
    
    return void(0);
}

function extend(SuperClass, Model) {
    var E = empty;
    var prototype;
    
    function Collection() {
        SuperClass.apply(this, arguments);
    }
    
    E.prototype = SuperClass.prototype;
    Collection.prototype = prototype = new E();
    prototype['@model'] = Model;
    return Collection;
}

function is(item) {
    return item instanceof Collection;
}

function Collection(items) {
    this.access = [];
    this.length = 0;
    if (items) {
        this.load(items);
    }
}


Collection.prototype = {
    constructor: Collection,
    access: void(0),
    load: function (items) {
        var me = this,
            keys = me.access,
            splice = A.splice,
            Model = me['@model'];
        var l, item, len, id, type;
        
        if (items instanceof Array) {
            len = 0;
            l = me.length;
            splice.call(me, 0, l);
            splice.call(keys, 0, l);
            
            for (l = items.length; l--;) {
                item = items[l];
                if (!(item instanceof Model)) {
                    item = new Model(item);
                }
                
                id = item.id();
                type = typeof id;
                if (type === 'string' ||
                    (type === 'number' && isFinite(id))) {
                    keys[l] = id;
                    me[l] = item;
                    len++;
                }
                else {
                    keys.splice(l, 1);
                    splice.call(me, l, 1);
                }
                
            }
            me.length = len;
            item = null;
            id = null;
        }
        keys = null;
        me = null;
        Model = null;
        splice = null;
        return this;
    },
    
    insert: function (item, index) {
        var me = this,
            Model = me['@model'],
            len = me.length;
        var id, type, keys;
        
        index = typeof index === 'number' && isFinite(index) ?
                    Math.max(0, index) : len;
        
        if (!(item instanceof Model)) {
            item = new Model(item);
        }
        
        id = item.id();
        type = typeof id;
        if (type === 'string' ||
            (type === 'number' && isFinite(id))) {
            keys = me.keys;
            if (index < len) {
                keys.splice(index, id);
            }
            else {
                keys[index] = id;
            }
            A.splice.call(me, index, item);
            this.length = keys.length;
            return index;
        }
        return -1;
    },
    
    remove: function (item) {
        var index = this.indexOf(item);
        
        if (index !== -1) {
            this.keys.splice(index, 1);
            A.splice.call(this, index, 1);
            this.length --;
        }
    },
    
    indexOf: function (item) {
        var me = this,
            l = me.length;
        for (; l--;) {
            if (l in me && me[l] === item) {
                return l;
            }
        }
        return -1;
    }
};


module.exports = EXPORTS;
EXPORTS.is = is;
