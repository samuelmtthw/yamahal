const express = require('express');
const AuthController = require('../controllers/AuthController');
const Controller = require('../controllers/Controller');
const isLoginMiddleware = require('../middlewares/isLogin');
const router = express.Router();

// const path1 = require('./path1');
// const path2 = require('./path2');

/**
 * Authentication
 */
router.get('/login', AuthController.formLogin);
router.post('/login', AuthController.postLogin);

/**
 * Content
 */
// router.use(isLoginMiddleware);
router.get('/', Controller.showHomepage);

// router.use('/path1', path1);
// router.use('/path2', path2);

module.exports = router;
