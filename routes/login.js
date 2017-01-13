/**
 * Created by RabbitLee on 31/12/2016.
 */

var express = require('express');
var router = express.Router();
let constPara = require('./constPara');
var request = require('request');

router.get('/', function(req, res, next) {
    res.sendfile('./public/login.html');
});

router.post('/isUserValid', function (req, res, next) {
     // console.log(req.body);
     let name = req.body.name;
     let password = req.body.password;
     url = 'http://' + constPara.backEndUrl() + '/login/isUserValid';
     request({url: url, method: 'POST', form: {name: name, password: password}},
         (error, response, body) => {
         if (!error && response.statusCode == 200) {
             let isValid = JSON.parse(body)['isValid'];
             // console.log('before:');
             // console.log(req.session.name);
             if (isValid) {
                 req.session.name = name;
                 req.session.password = password;
             }
             // console.log('after:');
             // console.log(req.session.name);
             res.send({'isValid': isValid});
         }
     })
})

router.post('/whetherLogin', function (req, res, next) {
    res.send({name: req.session.name});
})

router.post('/whetherAgencyLogin', function (req, res, next) {
    res.send({name: req.session.agencyName});
})

router.post('/exitAccount', function (req, res, next) {
    req.session.name = null;
    res.send({success:true});
})

router.post('/exitAgencyAccount', function (req, res, next) {
    req.session.agencyName = null;
    res.send({success:true});
})

module.exports = router;

