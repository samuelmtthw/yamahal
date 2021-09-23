const { Product } = require('../models');
const { Op } = require('sequelize');

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
				res.render('products-available', { products });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static showProductDetails(req, res) {
		let productId = Number(req.params.productId);

		Product.findByPk(productId)
			.then((product) => {
				res.render('product-details', { product });
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
}

module.exports = ProductController;
