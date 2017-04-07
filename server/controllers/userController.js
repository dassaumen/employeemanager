"use strict";
// auth 
var auth = require('../../auth');
// user model define
var UsersModel = require('../models/userModel.js');
module.exports = function(router){
	router.get('/users', auth.validate, function(req, res){
		UsersModel.getUsers(req.query, function(err, users){
			if(err){
				throw err;
			}
			res.json(users);
		});		
	});
	router.get('/users/:_id', auth.validate, function(req, res){
		UsersModel.getUserById(req.params._id, function(err, user){
			if(err){
				throw err;
			}
			res.json(user);
		});
	});
	router.post('/users', auth.validate, function(req, res){
		var user = req.body;
		UsersModel.addUser(user, function(err, user){
			if(err){
				throw err;
			}
			res.json(user);
		});
	});
	router.put('/users/:_id', auth.validate, function(req, res){
		var id = req.params._id;
		var user = req.body;
		//console.log(id, user);
		UsersModel.updateUser(id, user, {}, function(err, user){
			if(err){
				throw err;
			}
			res.json(user);
		});
	});

	router.delete('/users/:_id', auth.validate, function(req, res){
		var id = req.params._id;
		UsersModel.deleteUser(id, function(err, user){
			if(err){
				throw err;
			}
			res.json(user);
		});
	});
}