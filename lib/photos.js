var glob = require('glob');
var contentPath = './content/';

var files = glob.sync(contentPath + '*');

var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var imageNumbers = files.map(function(name) {
	return parseInt(name.substr(contentPath.length));
});
imageNumbers.sort(function numOrdA(a, b) {
	return (a - b);
});

module.exports = function(server){
	console.log('server', server);
	server.expose({
		MR: {
			/**
			 * @param {String} data base64 encoded image
			 * @returns {Promise<Number>} id of the image
			 */
			save: function(data) {
				var id = Math.max.apply(imageNumbers, imageNumbers) + 1;
				return fs.writeFileAsync(contentPath + id + ".jpg", new Buffer(data, "base64")).then(function() {
					console.log("image saved ", id);
					return id;
				});
			}
		}
	});
};

