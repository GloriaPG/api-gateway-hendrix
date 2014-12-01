/**
 * Created by gloria on 11/25/14.
 */

var express = require('express'),
    router = express.Router(),
    authController = require('../controllers/auth'),
    beerController = require('../controllers/beer.js');


// Create endpoint handlers for /beers
router.route('/')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route(':beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

module.exports = router;