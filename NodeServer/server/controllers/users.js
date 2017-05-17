var User = require('../models/user.js');

function UsersController(){
	this.users = {};

	this.search = function(req, res) {
		if(!req.params.searchTerm) {
			req.params.searchTerm = '';
		}
		User.get_users(req.params.searchTerm, function(status) {
			var index_status = status;
			if(index_status.error) {
				res.json(index_status);
			}
			else{
				res.json(index_status.data);
			}
		});
	};

	this.show = function(req, res) {
		User.get_user(req.params.id, function(status) {
			var show_status = status;
			if(show_status.error) {
				res.json(show_status);
			}
			else{
				res.json(show_status.data);
			}
		});
	};

	this.create = function(req, res){
		User.create_user(req.body, function(status) {
			var create_status = status;
			if(create_status.error) {
				res.json(create_status);
			}
			else{
				res.json(create_status);
			}
		});
	};

	this.update = function(req, res) {
		User.update_user(req.params.id, req.body, function(status) {
			var update_status = status;
			if(update_status.error) {
				res.json(update_status);
			}
			else{
				res.json(update_status.data);
			}
		});
	};

	this.delete = function(req, res){
		User.delete_user(req.params.id, function(status) {
			var delete_status = status;
			if(delete_status.error) {
				res.json(delete_status.errors);
			}
			else{
				res.json(delete_status.data);
			}
		});
	};

	this.login = function(req, res){
		User.login_user(req.body, function(status) {
			var login_status = status;
			if(login_status.error) {
				res.json(login_status);
			}
			else{
				res.json(login_status);
			}
		});
	};

	this.token = function(req, res){
		User.verify_token(req.body, function(status) {
			var token_status = status;
			if(token_status.error) {
				res.json(token_status);
			}
			else{
				res.json(token_status);
			}
		});
	};

	this.onConnection = function(id, token) {
		this.users[token] = id
		console.log(this.users);
	}

	this.onDisconnect = function(id) {
		console.log('user disconnected ' + id);
	}

	this.messageRecieved = function(data, io) {
		User.logMessage(data, io, function(status) {
			var message_status = status;
			if(message_status.error) {
				res.json(message_status);
			}
			else{
				res.json(message_status);
			}
		});
	}

}

module.exports = new UsersController();
