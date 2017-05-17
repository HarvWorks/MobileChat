var express     = require( 'express' ),
	path        = require( 'path' ),
	bp          = require('body-parser'),
	expressJWT  = require('express-jwt'),
	root        = __dirname,
	port        = process.env.PORT || 8000,
	app         = express(),
	cert 		= require('./key'),
	http		= require('http').Server(app),
	io 			= require('socket.io')(http);


app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use( bp.json() );
app.use( expressJWT( {secret: cert} ).unless({ path: [new RegExp('/app.*/', 'i') , {url: '/user', methods: ['POST']}, '/user/login']}));

require('./server/config/db.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app, io);

http.listen( port, function() {
	console.log( 'server running on port ' + port );
});
