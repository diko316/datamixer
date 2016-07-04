'use strict';

//require('./sample/core.js');

//require('./sample/processor.js');
//require('./sample/http.js');


//console.log('paths', module.filename);
//console.log('me ', require('index.js'));
var path = require('path'),
    mainPath = path.resolve(".");

global.use = function (id) {
    return require(path.resolve(mainPath, id));
};


require('./api/get.js');

require('./api/define.js');


