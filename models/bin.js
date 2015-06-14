var Schema = require('mongoose').Schema;

module.exports = function (MR) {

	var bin = MR.model('bin', {
		creation_date: { type: Date, default: Date.now },
		loc: { type: [Number], index: '2dsphere', required: true},
		has_bags: { type: Boolean, default: null},
		bags_input_date: { type: Date, default: Date.now },
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