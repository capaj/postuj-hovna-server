var Schema = require('mongoose').Schema;
var dateType = { type: Date, default: Date.now };
module.exports = function (MR) {

	var binState = MR.model('bin_state', {
		date: dateType,
		bin: { type: Schema.Types.ObjectId, ref: 'bin'},
		bag_count: { type: Number, default: 0 }
	}, {
		permissions: {
			C: 0,
			R: 0,
			U: 0,
			D: 0
		},
		schemaInit: function (schema) {
			schema.index({ bin: 1, date: 1 }, { unique: true, dropDups: true });
		}

	});

	return binState;
};