var modelNames = ['user', 'poo-state', 'photo', 'bin-state'];
var models = {};
modelNames.forEach(function(modelName) {
  models[modelName] = require('./' + modelName);
});

module.exports = models;