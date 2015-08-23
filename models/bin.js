
var karmaIncreaseOnCreate = require('./karma-increase-on-create');

var dateType = {type: Date, default: Date.now};
module.exports = function(MR) {
  var Schema = MR.mongoose.Schema;
	var bin = MR.model('bin', {
		creation_date: dateType,
		loc: {type: [Number], index: '2dsphere', required: true},
		photos: {type: [Number], default: []}
	}, {
		permissions: {
			C: 0,
			R: 0,
			U: 10,
			D: 10
		},
		schemaInit: function(schema) {
			schema.index({creation_date: 1, loc: 1}, {unique: true, dropDups: true});

			karmaIncreaseOnCreate(schema, 3);
		}

	});

	return bin;
};