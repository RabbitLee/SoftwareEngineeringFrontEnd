/**
 * Created by RabbitLee on 02/01/2017.
 */

var express = require('express');
var router = express.Router();
let constPara = require('./constPara');
var request = require('request');

router.post('/', function(req, res, next) {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;
    url = "http://" + constPara.backEndUrl() + '/register/';
    request({url: url, method: 'POST', form: {name: name, password: password, email: email, phone}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let isValid = JSON.parse(body)['isValid'];
                if (isValid == true) {
                    req.session.name = name;
                    req.session.password = password;
                }
                res.send({'isValid': isValid});
            }
        })
});

module.exports = router;

