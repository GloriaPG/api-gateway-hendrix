/**
 * Created by gloria on 11/25/14.
 */
var express = require('express'),
    router = express.Router(),
    authController = require('../controllers/auth'),
    userController = require('../controllers/user.js');

// Create endpoint handlers for /users
router.route('/')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

module.exports = router;