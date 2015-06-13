
var bin = require('./bin');
var poo = require('./poo');

var models = ['user', 'poo', 'bin'];

module.exports = function(MR){
	return models.map(function (modelName){
	   return require('./' + modelName)(MR);
	});
};