const { User, InfoUser } = require('../models');

class UserController {
	static showRegister(req, res) {
		res.render('register');
	}

	static registerUser(req, res) {
		let { username, email, password, name, address, phone } = req.body;

		//TODO hash password pake bcrypt

		User.create({
			username,
			email,
			password,
		})
			.then(() => {
				InfoUser.create({});
			})
			.catch((err) => {});
	}
}

module.exports = UserController;
