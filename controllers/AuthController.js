const { User } = require('../models');

class AuthController {
	static formLogin(req, res) {
		res.render('login');
	}

	static postLogin(req, res) {
		req.session.username = req.body.username;
		req.session.isLogin = true;
		req.session.role = 'user';

		res.redirect('/');

		// ambil password, bandingin sama yang ada di database

		// User.findOne({ where: { username: req.body.username } })
		// 	.then((user) => {
		// 		console.log(user);
		// 		req.session.role = user.role;
		// 		res.redirect('/');
		// 	})
		// 	.catch((err) => {
		// 		res.send(err);
		// 	});
	}

	static postLogout(req, res) {
		req.session.destroy();
		res.redirect('/login');
	}
}

module.exports = AuthController;
