var models = ['user', 'poo', 'bin', 'bin-state'];

module.exports = function(MR){

	return models.map(function (modelName){
	   return require('./' + modelName)(MR);
	});
};