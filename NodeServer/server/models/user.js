var connection = require('../config/db.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var cert = require('../../key');
var timeout = { expiresIn: '2h' }

function UserModel(){
	this.get_users = function(searchString, callback) {
		const searchTerm = searchString.substring(2) + '%'
		let query = ''
		if (searchString[0] == 'u') {
			query = "SELECT id, user_pic, username, email, created_at FROM users WHERE email LIKE ?"
		}
		else if (searchString[0] == 'r') {
			query = "SELECT id, user_pic, username, email, created_at FROM users WHERE email LIKE ?"
		}
		connection.query(query, [searchTerm], function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.get_user = function(id, callback) {
		connection.query("SELECT * FROM users WHERE id = ?", [id], function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.create_user = function(user, callback) {
		console.log(user);
		var err = {};
		if(!user.email) {
			err.email = "Email is required";
		}
		else if(!/[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/.test(user.email)) {
			err.email = "Invalid email address";
		}
		connection.query('SELECT id FROM users WHERE email = ?', [user.email], function(error, result) {
			if(result.length > 0) {
				err.email = "Email already exist, please use another one";
			}
			if(!user.password) {
				err.password = "Password is required";
			}
			else if(user.password.length < 8) {
				err.password = "Password needs at least 8 characters";
			}
			if(!user.password_confirm) {
				err.password_confirm = "Please confirm password";
			}
			else if(!err.password && user.password_confirm != user.password) {
				err.password_confirm = "Passwords don't match";
			}
			if(JSON.stringify(err) !== '{}') {
				callback({error: true, errors: err});
				return;
			}
			user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
			var data = [user.email, user.password];
			connection.query("INSERT INTO users SET email = ?, password = ?, created_at = NOW(), updated_at = NOW()", data, function(error, result) {
				if(error){
					callback({error: true, errors: error});
				}
				else {
					jwt.sign({ id: result.insertId, email: user.email, iat: Math.floor(Date.now() / 1000) - 30 }, cert, timeout, function(err, token) {
						connection.query("SELECT * FROM users WHERE email = ?", [user.email], function (error, result) {
							const newUser = { id: result[0].id, email: user.email, created_at: result[0].created_at }
							io.emit('newUser', newUser);
							callback({error: false, data: newUser, token: token});
						});
					});
				}
			});
		});
	};

	this.update_user = function(id, user, callback) {
		var err = {};
		if(!user.username) {
			err.username = "There was no username entered";
		}
		var data = [user.username, id];
		connection.query("UPDATE users SET username = ?, updated_at = NOW() WHERE id = ?", data, function(err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.delete_user = function(id, callback) {
		connection.query("DELETE FROM users WHERE id = ?", [id], function (err, result) {
			if(err){
				callback({error: true, errors: err});
			}
			else {
				callback({error: false, data: result});
			}
		});
	}

	this.login_user = function(user, callback) {
		var err = {};
		if(!user.email) {
			err.email = "Email is required";
		}
		if(!user.password) {
			err.password = "Password is required";
		}
		if(JSON.stringify(err) !== '{}') {
			callback({error: true, errors: err});
			return;
		}
		connection.query("SELECT * FROM users WHERE email = ?", [user.email], function (error, result) {
			if(result.length < 1) {
				err.email = "Email address and password don't match";
			}
			else if(!bcrypt.compareSync(user.password, result[0].password)) {
				err.email = "Email address and password don't match";
			}
			if(JSON.stringify(err) !== '{}') {
				callback({error: true, errors: err});
				return;
			}
			jwt.sign({ id: result[0].id, first_name: result[0].first_name, iat: Math.floor(Date.now() / 1000) - 30 }, cert, timeout, function(err, token) {
				callback({error: false, data: {id: result[0].id, user_pic: result[0].user_pic, username: result[0].username, email: result[0].email, created_at: result[0].created_at}, token: token});
			});
		});
	}

	this.verify_token = function(token, callback) {
		jwt.verify(token.token, cert, timeout, function(err, decoded) {
			if (err) {
				return callback({error:true})
			}
			else {
				console.log(decoded);
				return callback({error:false, data:true})
			}
		});
	}

	this.logMessage = function(msgData, io, callback) {
		console.log(msgData);
		io.emit('chat message', msgData);
		jwt.verify(msgData.token, cert, timeout, function(err, decoded) {
			if (err) {
				return callback({error:true})
			}
			else {
				console.log(decoded);
				return callback({error:false})
			}
		});
		// var data = [, msgData.msg];
		// connection.query("INSERT INTO users SET email = ?, password = ?, created_at = NOW(), updated_at = NOW()", data, function(error, result) {
		// 	if(error){
		// 		callback({error: true, errors: error});
		// 	}
		// 	else {
		// 		callback({error: false, data: result});
		// 	}
		// });
	}
}

module.exports = new UserModel();
