var karmaIncreaseOnCreate = require('./../lib/karma-increase-on-create');
var MR = require('moonridge');
var dateType = {type: Date, default: Date.now};


var binState = MR.model('bin_state', {
  timestamp: dateType,
  photo: {type: MR.mongoose.Schema.Types.ObjectId, ref: 'photo'},
  bag_count: {type: Number, default: 0}
}, {
  permissions: {
    C: 0,
    R: 0,
    U: 10,
    D: 10
  },
  schemaInit: function(schema) {
    schema.index({bin: 1, date: 1}, {unique: true, dropDups: true});

    karmaIncreaseOnCreate(schema, 1);

  }

});
var dateType = {type: Date, default: Date.now};

module.exports = binState;