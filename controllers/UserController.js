const { User, InfoUser, Product } = require('../models');
const bcrypt = require('bcryptjs');

class UserController {
	static showRegister(req, res) {
		let session = req.session;
		res.render('register', { session });
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
					.then(() => {
						req.session.isLogin = true;
						req.session.UserId = result.id;
						console.log(result.role);
						// req.session.role = result.role;
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

	static showInfo(req, res) {
		let userId = Number(req.session.UserId);
		let session = req.session;
		InfoUser.findOne({ where: { UserId: userId } })
			.then((user) => {
				res.render('user-info', { user, session });
			})
			.catch((err) => {
				console.log(err);
				res.send(err);
			});
	}

	static editInfo(req, res) {
		let userId = Number(req.session.UserId);
		let { name, address, phone } = req.body;
		InfoUser.update(
			{
				name,
				address,
				phone,
			},
			{
				where: { UserId: userId },
			}
		)
			.then(() => {
				res.redirect('/');
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static showPurchases(req, res) {
		let session = req.session;
		Product.findAll({ where: { UserId: req.session.UserId } })
			.then((purchases) => {
				res.render('purchases', { purchases, session });
			})
			.catch((err) => {
				res.send(err);
			});
	}
}

module.exports = UserController;
