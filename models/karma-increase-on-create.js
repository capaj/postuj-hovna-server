var userModel = require('./user').model;

module.exports = function(schema, points) {
  schema.on('create', function(doc) {
    if (doc.owner) {
      userModel.findByIdAndUpdate(doc.owner, {$inc: {karma: points}});
    }
  });
};