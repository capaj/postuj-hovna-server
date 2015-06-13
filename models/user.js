var request = require('request');
var Promise = require('bluebird');

module.exports = function (MR) {

	var userMRM = MR.userModel({
		online: { type: Boolean, default: true},
		fb: {
			id: {type: String, required: true},
			first_name: {type: String, required: true},
			last_name: {type: String, required: true},
			gender: {type: String, required: true},
			username: {type: String, required: true},   //FB username for constructing FB links and for fetching the user via routeparams on userDetail
			verified: {type: Boolean, required: true},
			birthday: {type: String, permissions:{R: 1, W: 5}},
			email: {type: String, required: true},
			location: {id: String, name: String},
			hometown: {id: String, name: String}
		},
		creation_date: { type: Date, default: Date.now },
		access_token: { type: String, permissions:{R:5, W:5}},   //FB access token
		privilige_level: {
			type: Number, default: 10, min:0, max: 5,
			permissions:{R: 0, W: 5}
		},
		settings: {
			fb_publish: {type:Boolean, default:true},
			page_limit: {type: Number, min: 1, max: 300}
		}
	}, {
		permissions: {
			C: 5,
			R: 0,
			U: 5,
			D: 5
		},
		statics: {
			fetchFBAcc: function (token) {
				var deferred = Promise.defer();
				request('https://graph.facebook.com/me?access_token=' + token + '&fields=id,email,first_name,last_name,username,birthday,gender,installed,verified,currency,location,hometown', function (error, response, body) {
					if (!error && response.statusCode == 200) {
						var fbAccDetails = JSON.parse(body);
						deferred.resolve(fbAccDetails);
					} else {
						deferred.reject(error);
					}
				});
				return deferred.promise;
			}
		}
	});

	userMRM.model.on('create', function (user) {
		console.log("created user: " + user);
	});

	return userMRM;
};