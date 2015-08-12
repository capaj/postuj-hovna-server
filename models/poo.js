var Schema = require('mongoose').Schema;
var karmaIncreaseOnCreate = require('./karma-increase-on-create');

module.exports = function (MR) {

	var poo = MR.model('poo', {
		creation_date: { type: Date, default: Date.now },
		cleared_date: { type: Date},
		status_changed_by: { type: Schema.Types.ObjectId, ref: 'user'},
		loc: { type: [Number], index: '2dsphere', required: true},
		photos: { type: [Number], default: []},
    status: {type: String, required: true, enum: ['present', 'gone', 'cleared'], default: 'present'}
	}, {
		permissions: {
			C: 0,
			R: 0,
			U: 10,
			D: 10
		},
		schemaInit: function (schema) {
      schema.index({ creation_date: 1, loc: 1 }, { unique: true, dropDups: true });

      karmaIncreaseOnCreate(schema, 2);
    }


	});

	return poo;
};