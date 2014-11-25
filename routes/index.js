/**
 * Created by gloria on 11/25/14.
 */
var express = require('express'),
    router = express.Router(),
    auth = require('./auth.js'),
    beers = require('./beers.js'),
    user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.use('/api/v1/beers',beers);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.use('/api/v1/users', user);

module.exports = router;