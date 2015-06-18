var models = ['user', 'photo', 'poo', 'bin'];

module.exports = function(MR){

	return models.map(function (modelName){
	   return require('./' + modelName)(MR);
	});
};