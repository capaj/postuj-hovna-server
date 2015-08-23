
var dateType = { type: Date, default: Date.now };
var karmaIncreaseOnCreate = require('./karma-increase-on-create');

module.exports = function (MR) {
  var Schema = MR.mongoose.Schema;
	var binState = MR.model('bin_state', {
		date: dateType,
		bin: { type: Schema.Types.ObjectId, ref: 'bin'},
		bag_count: { type: Number, default: 0 }
	}, {
		permissions: {
			C: 0,
			R: 0,
			U: 10,
			D: 10
		},
		schemaInit: function (schema) {
			schema.index({ bin: 1, date: 1 }, { unique: true, dropDups: true });

      karmaIncreaseOnCreate(schema, 1);

    }

	});

	return binState;
};