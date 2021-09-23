const { Product } = require('../models');

class ProductController {
	static showAllProducts(req, res) {
		Product.findAll({ where: { UserId: null } })
			.then((products) => {
				res.render('products-available', { products });
			})
			.catch((err) => {});
	}
}

module.exports = ProductController;