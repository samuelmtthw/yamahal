const { Product } = require('../models');

class ProductController {
	static showAllProducts(req, res) {
		Product.findAll({ where: { UserId: null } })
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
}

module.exports = ProductController;
