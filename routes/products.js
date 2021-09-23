const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/', ProductController.showAllProducts);

router.get('/add', ProductController.showAddProduct);

router.post('/add', ProductController.addProduct);

router.get('/:productId', ProductController.showProductDetails);

router.get('/:productId/buy', ProductController.buyProduct);

router.get('/:productId/delete', ProductController.deleteProduct);

module.exports = router;
