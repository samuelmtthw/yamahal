const { User } = require('../models');
const bcrypt = require('bcryptjs');

class AuthController {
	static formLogin(req, res) {
		let session = req.session;
		res.render('login', { session });
	}

	static postLogin(req, res) {
		let { username, password } = req.body;

		User.findOne({
			where: { username: username.toLowerCase() },
		})
			.then((user) => {
				// kalo gak nemu usernya
				if (!user) {
					res.send(`Username / Password is incorrect`);
				} else {
					// TODO compare password pake bcrypt
					let hash = user.password;

					if (bcrypt.compareSync(password, hash)) {
						req.session.role = user.role;
						req.session.isLogin = true;
						req.session.name = user.username;
						req.session.UserId = user.id;
						res.redirect('/');
					} else {
						res.send('Username / Password is incorrect');
					}
				}
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static postLogout(req, res) {
		req.session.destroy();
		res.redirect('/login');
	}
}

module.exports = AuthController;
