'use strict';


var path = require('path'),
    mainPath = path.resolve(".");

global.assert = require('chai').assert;
global.use = function (id) {
    return require(path.resolve(mainPath, id));
};

describe('datamixer api tests',
    function () {
        require('./api/default.js');
        require('./api/define.js');
        require('./api/subscribe.js');
    });



