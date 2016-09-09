var express = require('express');
var ip = require('ip');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var Usuario= require('./models/usuario.js');
var models = require("./models/index.js");
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');



//Express
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//app.use(express.static(path.join(__dirname, 'angular')));
require('./router/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./config/passport')(passport); // pass passport for configuration
app.use(express.static('public'));


var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));



//Routes
app.use('/api', require('./router/api'));

//Start Server
models.sequelize.sync().then(function () {
	var server = app.listen(3300, function () {
		var host = ip.address();
		var port = server.address().port;
		console.log('Example app listening at http://%s:%s', host, port);
	});
});

