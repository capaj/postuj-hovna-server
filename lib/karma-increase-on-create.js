var MR = require('moonridge');
module.exports = function(schema, points) {
    schema.on('create', function(doc) {
    if (doc.owner) {
      var owner = doc.owner.valueOf();
      MR.models.user.findByIdAndUpdate(owner, {$inc: {karma: points}}).catch(function (err){
          console.error(err);
      });
    }
  });
};