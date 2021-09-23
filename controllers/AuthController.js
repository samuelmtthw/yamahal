const { User } = require('../models');

class AuthController {
	static formLogin(req, res) {
		res.render('login');
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
					if (password === user.password) {
						req.session.role = user.role;
						req.session.isLogin = true;
						req.session.name = user.username;
						res.redirect('/products');
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
