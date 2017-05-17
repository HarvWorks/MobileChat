var users = require('../controllers/users.js');
var path = require( 'path' );

module.exports = function(app, io){
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../../client/index.html'));
	});
	app.get('/users/all', function(req, res) {
		users.index(req, res);
	});
	app.get('/users/all/:searchTerm', function(req, res) {
		users.index(req, res);
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
		socket.on('authorization', function(token) {
			users.onConnection(socket.id, token)

			socket.on('disconnect', function(){
		    	users.onDisconnect(socket.id)
		  	});

			socket.on('chat message', function(data){
				users.messageRecieved(data, io)
			});

		})
	});
};
