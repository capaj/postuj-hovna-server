var Schema = require('mongoose').Schema;

module.exports = function (MR) {

	var bin = MR.model('bin', {
		creation_date: { type: Date, default: Date.now },
		loc: { type: [Number], index: '2dsphere', required: true},
		bags: { type: Number, default: 0},
		text: { type: String},
		photos: { type: [Number], default: []}
	}, {
		permissions: {
			C: 1,
			R: 0,
			U: 5,
			D: 5
		},
		schemaInit: function (schema) {
			schema.index({ creation_date: 1, loc: 1 }, { unique: true, dropDups: true });
		}

	});

	return bin;
};