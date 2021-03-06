const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user.controller');

router.get('/users', UsersController.getAll);
router.get('/logged', UsersController.logIn);
router.get('/loggedout',UsersController.logOut);
router.put('/user/:id', UsersController.update);

module.exports = router;
