'use strict';


var path = require('path'),
    mainPath = path.resolve(".");

global.assert = require('chai').assert;
global.asyncAssert = function (done, itShould) {
    
};
global.use = function (id) {
    return require(path.resolve(mainPath, id));
};



describe('datamixer collection',
    function () {
        require('./collection/index.js');
    });

describe('datamixer default types',
    function () {
        require('./type/text.js');
        require('./type/integer.js');
        require('./type/float.js');
        require('./type/numeric.js');
        require('./type/enum.js');
        require('./type/record.js');
        require('./type/list.js');
    });

describe('datamixer processor',
    function () {
    });


describe('datamixer API',
    function () {
        require('./api/default.js');
        require('./api/define.js');
        require('./api/subscribe.js');
        require('./api/exist.js');
    });

describe('datamixer Model',
    function () {
        require('./model/index.js');
    });

