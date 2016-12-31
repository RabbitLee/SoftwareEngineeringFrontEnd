/**
 * Created by RabbitLee on 31/12/2016.
 */

var express = require('express');
var request = require('request');
var router = express.Router();
var constPara = require('./constPara');

/* GET users listing. */
router.post('/isUserValid', function(req, res, next) {
    let name = req.body.name;
    let password = req.body.password;
    url = 'http://' + constPara.backEndUrl() + '/login/isUserValid';
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            let isValid = body.query.isValid;
            res.send({'isValid': isValid});
        }
    });
});

module.exports = router;

