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
    var access = [];
    
    access.$$index = {};
    this.access = access;
    this.length = 0;
    if (items) {
        this.load(items);
    }
    
}


Collection.prototype = {
    
    access: void(0),
    
    constructor: Collection,
    
    load: function (items) {
        var me = this,
            keys = me.access,
            Arr = A,
            splice = Arr.splice,
            isObject = O.toString.call(items) === '[object Object]';
            
        var l, item, len, id, hasOwn, Model, ItemModel, isEmpty, index;
        
        if (isObject || items instanceof Arr.constructor) {
            keys.$$index = index = {};
            len = 0;
            l = me.length;
            splice.call(me, 0, l);
            splice.call(keys, 0, l);
            Model = me['@model'];
            
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
                    item = me.createRecord(items[id]);
                    if (item) {
                        index[id] = true;
                        keys[len] = id;
                        me[len++] = item;
                    }
                }
            }
            else {
                for (l = items.length; l--;) {
                    item = me.createRecord(items[l]);
                    if (item) {
                        id = me.createId(item, null);
                        isEmpty = id === null;
                        if (isEmpty || index.hasOwnProperty(id)) {
                            if (!isEmpty) {
                                me[keys.indexOf(id)] = item;
                            }
                            keys.splice(l, 1);
                            splice.call(me, l, 1);
                        }
                        else {
                            index[id] = true;
                            keys[l] = id;
                            me[l] = item;
                            len++;
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
        var Model = this['@model'],
            Base = MODEL.Model;
        
        if (item instanceof Base) {
            if (item instanceof Model) {
                return item;
            }
            else {
                item = item.valueOf();
            }
        }
        return new Model(item);
    },
    
    createId: function (item, id) {
        var type;
        
        if (id === null || typeof id === 'undefined') {
            id = item.id();
        }
        
        type = typeof id;
        
        if ((type === 'string' && type) ||
            (type === 'number' && isFinite(id))) {
            
            return id;
        
        }
        
        return null;
       
    },
    
/**
 * By Key
 */
    get: function (key) {
        var keys = this.access,
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
    insert: function (item, index, id) {
        var me = this,
            Model = me['@model'],
            len = me.length,
            keys = me.access,
            primaryIndex = keys.$$index;
        
        index = typeof index === 'number' && isFinite(index) ?
                    Math.max(0, index) : len;
        
        if (!(item instanceof Model)) {
            item = new Model(item);
        }
        
        if (!item.isValid().error) {
            id = me.createId(item, id);
            
            if (!primaryIndex.hasOwnProperty(id) && id !== null) {
                primaryIndex[id] = true;
                if (index >= len) {
                    keys[len] = id;
                    me[len] = item;
                    me.length++;
                }
                else {
                    keys.splice(index, 0, id);
                    A.splice.call(me, index, 0, item);
                }
                return item;
            }
        }
        
        return void(0);
    },
    
    remove: function (item) {
        var index = this.indexOf(item);
        if (index !== -1) {
            this.removeAt(index);
        }
        return index;
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
        var me = this,
            keys = me.access,
            primaryIndex = me.access.$$index;
        var item;
        if (typeof index === 'number' && isFinite(index) &&
            index >= 0 && index < me.length) {
            delete primaryIndex[keys[index]];
            keys.splice(index, 1);
            item = me[index];
            A.splice.call(me, index, 1);
            return item;
        }
        return void(0);
    },
    
/**
 * conversion
 */
    toObject: function () {
        var me = this,
            len = me.length,
            keys = me.keys,
            c = -1,
            created = {};
        var key;
        
        for (; len--;) {
            key = keys[++c];
            created[key] = me[c];
        }
        
        return created;
    }
};


module.exports = EXPORTS;
EXPORTS.Class = Collection;
EXPORTS.is = is;
