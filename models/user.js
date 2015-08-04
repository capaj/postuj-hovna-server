var request = require('request');

module.exports = function (MR) {

	var userMRM = MR.userModel({
		karma: { type: Number, default: 0},
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
		privilige_level: {
			type: Number, default: 10, min:0, max: 5,
			permissions:{R: 0, W: 5}
		},
		settings: {
			fb_publish: {type:Boolean, default:true}
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
        return new Promise(function (resolve, reject) {
          request('https://graph.facebook.com/me?access_token=' + token + '&fields=id,email,first_name,last_name,username,birthday,gender,installed,verified,currency,location,hometown', function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var fbAccDetails = JSON.parse(body);
              resolve(fbAccDetails);
            } else {
              reject(error);
            }
          });
        });
			}
		}
	});

	userMRM.schema.on('create', function (user) {
		console.log("created user: " + user);
	});

	return userMRM;
};