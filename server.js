var express    = require('express');     // call express
var bodyParser = require('body-parser'); // call body parser
var morgan	   = require('morgan'); 	 // call morgan
var app        = express();              // define our app using express
var mongoose   = require('mongoose');	 // call mongose
var fs 		   = require('fs');
var config     = require('./config'); // get our config file

/*
|-------------------------------------------
| CORS middleware
|-------------------------------------------
*/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
}
app.use(allowCrossDomain);

/*
|-------------------------------------------
| Mongo connection
|-------------------------------------------
*/
mongoose.connect(config.database);
var db = mongoose.connection;
/*
|-------------------------------------------
| configure app to use bodyParser()
| this will let us get the data from a POST
|-------------------------------------------
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// use morgan to log requests to the console
app.use(morgan('dev'));

var port = process.env.PORT || 9999; // set our port

/*
|--------------------------------------------
| ROUTES FOR OUR API
|--------------------------------------------
*/
var router = express.Router(); // get an instance of the express Router

/*
|--------------------------------------------
| Register all model for api
| dynamically include routes (Controller)
|--------------------------------------------
*/
fs.readdirSync('./server/controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		require("./server/controllers/" + file)(router);
	}
});

app.use('/api', router);
/*
|--------------------------------------------
| START THE SERVER
|--------------------------------------------
*/
var server = app.listen(port, function(){
	console.log('Server running on port ' + port);
});