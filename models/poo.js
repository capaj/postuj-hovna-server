var Schema = require('mongoose').Schema;

var dateType = { type: Date, default: Date.now };
module.exports = function (MR) {

	var poo = MR.model('poo', {
		creation_date: dateType,
		last_refresh: dateType,
		photos: { type: [{ type: Schema.Types.ObjectId, ref: 'photo'}], default: []}
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

	return poo;
};