"use strict";
// call mongo
var mongoose = require('mongoose'); 
// Configure schema
var usersSchema = mongoose.Schema({
	firstname:{
		type:String
	},
	lastname:{
		type:String
	},
	email:{
		type:String
	},
	mobile:{
		type:Number
	},
	dob:{
		type:Date,
		default:Date.now
	},
	address:{
		type:String
	},
	salary:{
		type:Number
	}
});
// Assign schema
var Users = module.exports = mongoose.model('User', usersSchema);

// Grab all users
module.exports.getUsers = function(query, callback, limit){
	Users.find(query, callback).limit(limit);
}

// get single User
module.exports.getUserById = function(id, callback){
	Users.findById(id, callback);
}

// add User
module.exports.addUser = function(user, callback){
	Users.create(user, callback);
}

// update User
module.exports.updateUser = function(id, user, options, callback){
	var query = {_id: id};
	var update = user;
	Users.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.deleteUser = function(id, callback){
	var query = {_id: id};
	Users.remove(query, callback);
}