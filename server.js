var express = require('express');
var MR = require('./mr-init');

var server = MR.bootstrap(8020);

require('./lib/photos')(server);
server.expressApp.use('/img', express.static('content'));
server.expose({
  MR: {
    authorize: function(accessToken) {	//example of a later authorization, typical for any public facing apps
      var socket = this;
      var userModel = MR.models.user;
      return userModel.fetchFBAcc(accessToken).then(function(acc){
        return userModel.findOne({'fb.id': acc.id}).exec().then(function(user) {
          if (user) {
            console.log("Authenticated user: ", user);
            socket.moonridge.user = user;
            return user;

          } else {
            console.log('did not find such user-creating');
            return userModel.create({fb: acc}).then(function(user) {
              console.log("created and authenticated user: ", user);
              socket.moonridge.user = user;
              return user;
            });
          }
        }, function (err) {
          console.log("authorize error " + err);
        });
      });

    }
  }
});