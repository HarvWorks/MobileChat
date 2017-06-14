var users = require('../controllers/users.js');
var path = require( 'path' );

module.exports = function(app, io){
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../../client/index.html'));
	});
	app.get('/search/:searchTerm', function(req, res) {
		users.search(req, res);
	});
	app.get('/user/:id', function(req, res) {
		users.show(req, res);
	});
	app.post('/user', function(req, res) {
		users.create(req, res);
	});
	app.put('/user/:id', function(req, res) {
		users.update(req, res);
	});
	app.put('/user/:id/password', function(req, res) {
		users.update_password(req, res);
	});
	app.delete('/user/:id', function(req, res) {
		users.delete(req, res);
	});
	app.post('/user/login', function(req, res) {
		users.login(req, res);
	});
	app.post('/user/token', function(req, res) {
		users.token(req, res);
	});

	io.on('connection', function(socket){
		users.onConnection(socket.id)

		socket.on('disconnect', function(){
	    	users.onDisconnect(socket.id)
	  	});

		socket.on('chatMessage', function(data){
			console.log(data);
			users.messageRecieved(data, io)
		});

	});
};
