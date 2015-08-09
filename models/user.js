var request = require('request');

module.exports = function (MR) {

	var userMRM = MR.userModel({
		karma: { type: Number, default: 0},
		fb: {
			id: {type: String, required: true, unique: true},
			name: {type: String},
			gender: {type: String},
			username: {type: String},   //FB username for constructing FB links and for fetching the user via routeparams on userDetail
			verified: {type: Boolean},
			birthday: {type: String, permissions:{R: 1, W: 5}},
			email: {type: String},
			location: {id: String, name: String},
			hometown: {id: String, name: String}
		},
		creation_date: { type: Date, default: Date.now },
		privilige_level: {
			type: Number, default: 5, min: 0, max: 20,
			permissions:{R: 0, W: 5}
		},
		settings: {
			fb_publish: {type:Boolean, default:true}
		}
	}, {
		permissions: {
			C: 20,
			R: 0,
			U: 10,
			D: 10
		},
		statics: {
			fetchFBAcc: function (token) {
        return new Promise(function (resolve, reject) {
          request('https://graph.facebook.com/me?access_token=' + token + '&fields=id,name,email,gender,installed,verified,location,hometown', function (error, response, body) {
            if (error) {
              reject(error);
            } else {
              var body = JSON.parse(body);
              if (response.statusCode == 200) {
                resolve(body);
              } else {
                reject(body.error);
              }
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