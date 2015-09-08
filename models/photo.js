var karmaIncreaseOnCreate = require('./../lib/karma-increase-on-create');

var dateType = {type: Date, default: Date.now};
var MR = require('moonridge');

var photo = MR.model('photo', {
  capture_date: dateType,
  type: {type: String, required: true},
  loc: {type: [Number], index: '2dsphere', required: true},
  photoIds: {type: [Number], default: []}
}, {
  permissions: {
    C: 0,
    R: 0,
    U: 10,
    D: 10
  },
  schemaInit: function(schema) {
    schema.index({creation_date: 1, loc: 1}, {unique: true, dropDups: true});

    karmaIncreaseOnCreate(schema, 3);
  }

});

module.exports = photo;
