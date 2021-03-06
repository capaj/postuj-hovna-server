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
	server.expose({
		/**
		 * @param {String} data base64 encoded image
		 * @returns {Promise<Number>} id of the image saved on HDD
		 */
		savePhoto: function(data) {
			var id = Math.max.apply(imageNumbers, imageNumbers) + 1;
			if (!Number.isFinite(id)) {
				id = 0;
			}
			return fs.writeFileAsync(contentPath + id + ".jpg", new Buffer(data, "base64")).then(function() {
				console.log("image saved ", id);
				imageNumbers.push(id);
				return id;
			});
		}
	});
};

