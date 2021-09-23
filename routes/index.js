const express = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const Controller = require('../controllers/Controller');
const isLoginMiddleware = require('../middlewares/isLogin');
const router = express.Router();

const products = require('./products');
// const path2 = require('./path2');

/**
 * Authentication
 */

router.get('/login', AuthController.formLogin);
router.post('/login', AuthController.postLogin);
router.get('/logout', AuthController.postLogout);

router.get('/register', UserController.showRegister);
router.post('/register', UserController.registerUser);

/**
 * Content
 */
router.use(isLoginMiddleware);
router.get('/', Controller.showHomepage);

router.use('/products', products);
// router.use('/path2', path2);

module.exports = router;
