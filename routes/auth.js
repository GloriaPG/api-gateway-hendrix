var jwt = require('jwt-simple');
var User = require('../models/user');

var auth = {

    login: function(req, res) {

        var username = req.body.username || '',
            password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        var dbUserObj = auth.validate(username, password);

        console.log(dbUserObj);

        if (!dbUserObj) { // If authentication fails, we send a 401 back
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        if (dbUserObj) {

            // If authentication is success, we will generate a token
            // and dispatch it to the client

            res.json(genToken(dbUserObj));
        }

    },

    validate: function(username, password) {
        // spoofing the DB response for simplicity
        // Use the User model to find a specific usermodel
        var result
        User.find({ username:username, password:password }, function(err, user) {
            if (err)
                result=err;
            else
                result =user;
        });
        /*** var dbUserObj = { // spoofing a userobject from the DB.
            name: 'zesk8',
            role: 'admin',
            username: 'zesk8@node.com',
            password: 'secret182'
        };***/
        console.log('Resultado VALIDATE : ' +  result)
        return result;
    },

    validateUser: function(req,username) {
        // spoofing the DB response for simplicity
        var result
        /*** var dbUserObj = { // spoofing a userobject from the DB.
            name: 'zesk8',
            role: 'user',
            username: 'zesk8@node.com'
        };***/
       result = User.find({ username:username }, function(err, user) {
            if (err)
                result=err;
            else
                result =user;
        });
        console.log('Resultado VALIDATEUSER : ' +  result)
        return result;
    },
}

// private method
function genToken(user) {
    var expires = expiresIn(7), // 7 days
        token = jwt.encode({
            exp: expires
        }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;