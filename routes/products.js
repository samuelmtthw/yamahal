const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/', ProductController.showAllProducts);

router.get('/:productId', ProductController.showProductDetails);

module.exports = router;
