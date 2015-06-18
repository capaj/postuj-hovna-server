var Schema = require('mongoose').Schema;

var dateType = { type: Date, default: Date.now };
module.exports = function (MR) {

	var photo = MR.model('photo', {
		creation_date: dateType,
		loc: {type: [Number], index: '2dsphere', required: true},
		name: {type: String, required: true}
	}, {
		permissions: {
			C: 0,
			R: 0,
			U: 5,
			D: 5
		},
		schemaInit: function (schema) {
			schema.index({ creation_date: 1, loc: 1 }, { unique: true, dropDups: true });
		}

	});

	return photo;
};