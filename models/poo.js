var Schema = require('mongoose').Schema;

module.exports = function (MR) {

	var poo = MR.model('poo', {
		creation_date: { type: Date, default: Date.now },
		loc: { type: [Number], index: '2dsphere', required: true},
		pieces: { type: Number, default: 1},
		rating: { type: Number, default: 5},
		notoriety: { type: Number, default: 0},
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

	return poo;
};