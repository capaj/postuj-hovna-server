var mongoose = require('mongoose');
var Moonridge = require('moonridge');
mongoose.set('debug', true);
var config = require('config');
var express = require('express');
var MR = Moonridge(mongoose, config.mongo);
var models = require('./models/models')(MR);

var server = MR.bootstrap(8020);
require('./lib/photos')(server);

server.expressApp.use('/img', express.static('content'));

server.expose({
  MR: {
    authorize: function(accessToken) {	//example of a later authorization, typical for any public facing apps
      var socket = this;
      var userModel = models.user.model;
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