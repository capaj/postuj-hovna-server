var modelNames = ['user', 'poo', 'bin', 'bin-state'];

module.exports = function(MR) {
  var models = {};
  modelNames.forEach(function(modelName) {
    models[modelName] = require('./' + modelName)(MR);
  });
  return models;
};