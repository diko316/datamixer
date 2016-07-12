'use strict';

var EXPORTS = create,
    MANAGER = require('./manager.js'),
    MODEL = require('./model.js'),
    A = Array.prototype,
    O = Object.prototype;

function empty() {
    
}

function create(model, items) {
    var modelMgr = MODEL;
    var Constructor;
    
    if (model instanceof Collection) {
        return new (model.constructor)(items);
    }
    else if (typeof model === 'string' && MANAGER.exist(model)) {
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

function uniqueEqual(item1, item2) {
    return item1 === item2;
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
            Arr = A,
            splice = Arr.splice,
            isObject = O.toString.call(items) === '[object Object]';
            
        var l, item, len, id, type, hasOwn, primary, unique, Model, ItemModel;
        
        if (isObject || items instanceof Arr.constructor) {
            len = 0;
            l = me.length;
            splice.call(me, 0, l);
            splice.call(keys, 0, l);
            Model = me['@model'];
            primary = null;
            unique = {};
            
            if (items instanceof Collection) {
                ItemModel = items['@model'];
                // copy all items
                if (Model === ItemModel ||
                    ItemModel.prototype instanceof Model) {
                    keys.push.apply(keys, items.access);
                    Arr.push.apply(me, items);
                }
            }
            else if (isObject) {
                hasOwn = O.hasOwnProperty;
                for (id in items) {
                    if (!hasOwn.call(items, id)) {
                        continue;
                    }
                    item = this.createRecord(items[id]);
                    if (item) {
                        keys[len] = id;
                        me[len++] = item;
                    }
                }
            }
            else {
                for (l = items.length; l--;) {
                    item = this.createRecord(items[l]);
                    if (item) {
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
                }
                
            }
            
            me.length = len;
        }
        keys = null;
        me = null;
        splice = null;
        return this;
    },
    
    createRecord: function (item) {
        var Model = this['@model'];
        
        if (item instanceof Model) {
            return item;
        }
        return new Model(item);
    },

/**
 * By Key
 */
    get: function (key) {
        var keys = this.keys,
            l = keys.length;
        
        for (; l--;) {
            if (keys[l] === key) {
                return l in this ? this[l] : void(0);
            }
        }
        return void(0);
    },
    
/**
 * By Item
 */
    add: function (item, index) {
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
        return this.removeAt(
                this.indexOf(item)
            );
    },
    
    normalize: function () {
        var me = this,
            keys = me.keys,
            l = keys.length;
        var sl, key;
        
        for (; l--;) {
            key = keys[l];
            sl = l;
            for (; sl--;) {
                if (key === keys[sl]) {
                    me.removeAt(sl);
                    l--;
                }
            }
        }
        
        return this;
    },
    
    unique: function (fn) {
        var me = this,
            l = me.length;
        var sl, item;
        
        if (!(fn instanceof Function)) {
            fn = uniqueEqual;
        }
        
        for (; l--;) {
            item = me[l];
            sl = l;
            for (; sl--;) {
                if (fn.call(me, item, me[sl]) === true) {
                    me.removeAt(sl);
                    l--;
                }
            }
        }
        
        return this;
    },

/**
 * By Index
 */
    indexOf: function (item) {
        var me = this,
            l = me.length;
        for (; l--;) {
            if (l in me && me[l] === item) {
                return l;
            }
        }
        return -1;
    },
    
    removeAt: function (index) {
        if (typeof index === 'number' && isFinite(index) &&
            index >= 0 && index < this.length) {
            this.keys.splice(index, 1);
            A.splice.call(this, index, 1);
            this.length --;
            return index;
        }
        return -1;
    }
    
    
};


module.exports = EXPORTS;
EXPORTS.is = is;
