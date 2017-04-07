"use strict";
// auth 
var config = require('./config');
module.exports = {
	validate: function(req, res, next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if(token){
			if(token === config.secret){
				next();
			}else{
				res.status(401).send({
			        success: false, 
			        message: 'Unauthorized token provided.' 
			    });
			}
		} else {
			return res.status(403).send({
		        success: false, 
		        message: 'No token provided.' 
		    });
		}	
	}
}