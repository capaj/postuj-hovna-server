var karmaIncreaseOnCreate = require('./../lib/karma-increase-on-create');
var dateType = {type: Date, default: Date.now};
var MR = require('moonridge');
var Schema = MR.mongoose.Schema;

var poo = MR.model('poo_state', {
  timestamp: dateType,
  photo: {type: Schema.Types.ObjectId, ref: 'photo'},
  type: {type: String, required: true, enum: ['present', 'gone', 'cleared'], default: 'present'}
}, {
  permissions: {
    C: 0,
    R: 0,
    U: 10,
    D: 10
  },
  schemaInit: function(schema) {
    schema.index({type: 1, owner: 1, photo: 1}, {unique: true, dropDups: true});

    karmaIncreaseOnCreate(schema, 2);
  }


});

module.exports = poo;
