var Moonridge = require('moonridge');
var config = require('config');
var MR = Moonridge(config.mongo);
require('./models/models')(MR);
MR.mongoose.set('debug', true);

module.exports = MR;