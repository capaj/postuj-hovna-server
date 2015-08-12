module.exports = function(schema, points) {

  schema.on('create', function(doc) {
    if (doc.owner) {
      var MR = require('../db-init');
      console.log("doc.owner", doc.owner);
      MR.models.user.findByIdAndUpdate(doc.owner, {$inc: {karma: points}}); //TODO find out why this is not working
    }
  });
};