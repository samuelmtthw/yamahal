const { User } = require('../models');

class AuthController {
	static formLogin(req, res) {
		res.render('login');
	}

	static postLogin(req, res) {
		let { username, password } = req.body;

		User.findOne({ where: { username: username } })
			.then((user) => {
				// TODO compare password pake bcrypt

				console.log(user);
				req.session.role = user.role;
				res.redirect('/');
			})
			.catch((err) => {
				res.send(err);
			});

		// req.session.isLogin = true;
		// req.session.role = 'user';

		// res.redirect('/');

		// ambil password, bandingin sama yang ada di database
	}

	static postLogout(req, res) {
		req.session.destroy();
		res.redirect('/login');
	}
}

module.exports = AuthController;
