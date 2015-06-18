var Schema = require('mongoose').Schema;

module.exports = function (MR) {

	var dateType = {type: Date, default: Date.now};
	var bin = MR.model('bin', {
		creation_date: dateType,
		has_bags: { type: Boolean, default: null},
		bags_input_date: dateType,
		text: { type: String},
		removed: {type: Boolean},	//when this bin does not exist anymore
		photo: { type: Schema.Types.ObjectId, ref: 'photo'}
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