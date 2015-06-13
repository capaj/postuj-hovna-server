var mongoose = require('mongoose');
var Moonridge = require('moonridge');
mongoose.set('debug', true);
var config = require('config');

var MR = Moonridge(mongoose, config.mongo);
require('./models/models')(MR);

var server = MR.bootstrap(8020);
require('./lib/photos')(server);

