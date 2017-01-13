/**
 * Created by RabbitLee on 13/01/2017.
 */

var express = require('express');
var router = express.Router();
let constPara = require('./constPara');
var request = require('request');

router.post('/isUserValid', function (req, res, next) {
    // console.log(req.body);
    let name = req.body.name;
    let password = req.body.password;
    url = 'http://' + constPara.backEndUrl() + '/agencyLogin/isUserValid';
    request({url: url, method: 'POST', form: {name: name, password: password}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let isValid = JSON.parse(body)['isValid'];
                if (isValid) {
                    req.session.agencyName = name;
                    req.session.agencyPassword = password;
                }
                res.send({'isValid': isValid});
            }
        })
})

module.exports = router;
