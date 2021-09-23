const { User, InfoUser } = require('../models');
const bcrypt = require('bcryptjs');

class UserController {
	static showRegister(req, res) {
		res.render('register');
	}

	static registerUser(req, res) {
		let { username, email, password, name, address, phone } = req.body;

		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(password, salt);

		//TODO hash password pake bcrypt

		User.create({
			username,
			email,
			password: hash,
		})
			.then((result) => {
				InfoUser.create({ name, address, phone, UserId: result.id })
					.then((result) => {
						req.session.isLogin = true;
						req.session.UserId = result.id;
						req.session.name = name;
						res.redirect('/');
					})
					.catch((err) => {
						let errMsg = err.errors.map((el) => {
							return el.message;
						});
						res.send(errMsg);
					});
			})
			.catch((err) => {
				let errMsg = err.errors.map((el) => {
					return el.message;
				});
				res.send(errMsg);
			});
	}
}

module.exports = UserController;
