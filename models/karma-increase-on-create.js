module.exports = function(schema, points) {

  schema.on('create', function(doc) {
    var MR = require('../mr-init');
    if (doc.owner) {
      var owner = doc.owner.valueOf();
      MR.models.user.findByIdAndUpdate(owner, {$inc: {karma: points}}, function(err, result) {
        if (err) {
          console.error(err);
        }
      });
    }
  });
};