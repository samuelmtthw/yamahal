const { Product, Category } = require('../models');
const { Op } = require('sequelize');
const formatPrice = require('../helpers/formatPrice');

class ProductController {
	static showAllProducts(req, res) {
		let name = req.query.name;

		let condition;

		if (!name) {
			condition = { UserId: null };
		} else {
			condition = {
				UserId: null,
				name: { [Op.iLike]: `%${name}%` },
			};
		}

		Product.findAll({ where: condition })
			.then((products) => {
				let session = req.session;
				res.render('products-available', {
					products,
					session,
					formatPrice,
				});
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static showProductDetails(req, res) {
		let productId = Number(req.params.productId);

		Product.findByPk(productId)
			.then((product) => {
				let session = req.session;
				res.render('product-details', { product, session });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static buyProduct(req, res) {
		let productId = Number(req.params.productId);
		let userId = Number(req.session.UserId);

		Product.update(
			{
				UserId: userId,
			},
			{
				where: { id: productId },
			}
		)
			.then(() => {
				res.redirect('/user/purchases');
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static showAddProduct(req, res) {
		let session = req.session;

		if (session.role !== 'admin') {
			res.redirect('/');
		} else {
			Category.findAll()
				.then((categories) => {
					res.render('add-product', { categories, session });
				})
				.catch((err) => {
					res.send(err);
				});
		}
	}

	static addProduct(req, res) {
		let { name, price, imageUrl, CategoryId, description } = req.body;

		name = Product.formatName(name);

		console.log(req.body);
		Product.create({ name, price, imageUrl, CategoryId, description })
			.then(() => {
				res.redirect('/products');
			})
			.catch((err) => {
				let errMsg = err.errors.map((el) => {
					return el.message;
				});
				res.send(errMsg);
			});
	}

	static showAdminProducts(req, res) {
		let session = req.session;
		Product.findAll()
			.then((products) => {
				res.render('sales', { products, session });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static deleteProduct(req, res) {
		let productId = Number(req.params.productId);

		Product.destroy({ where: { id: productId } })
			.then(() => {
				res.redirect('/sales');
			})
			.catch((err) => {
				console.log(err);
				res.send(err);
			});
	}
}

module.exports = ProductController;
