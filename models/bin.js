var Schema = require('mongoose').Schema;
var dateType = { type: Date, default: Date.now };
module.exports = function (MR) {

	var bin = MR.model('bin', {
		creation_date: dateType,
		loc: { type: [Number], index: '2dsphere', required: true},
		bag_pieces: { type: Number, default: 0},
		last_input_date: dateType,
		text: { type: String},
		photos: { type: [Number], default: []}
	}, {
		permissions: {
			C: 0,
			R: 0,
			U: 0,
			D: 0
		},
		schemaInit: function (schema) {
			schema.index({ creation_date: 1, loc: 1 }, { unique: true, dropDups: true });
		}

	});

	return bin;
};