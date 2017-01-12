/**
 * Created by RabbitLee on 02/01/2017.
 */

var express = require('express');
var router = express.Router();
let constPara = require('./constPara');
var request = require('request');

router.post('/getGaodeDeveloperKey', function(req, res, next) {
    url = "http://" + constPara.backEndUrl() + '/selectSpots/getGaodeDeveloperKey';
    request({url: url, method: 'POST'},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let key = JSON.parse(body)['key'];
                res.send({'key': key});
            }
        })
});

router.post('/getAllProvinces', function(req, res, next) {
    url = "http://" + constPara.backEndUrl() + '/selectSpots/getAllProvinces';
    request({url: url, method: 'POST'},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let provinces = JSON.parse(body)['provinces'];
                res.send({'provinces': provinces});
            }
        })
});

router.post('/getAllCities', function(req, res, next) {
    let provinceName = req.body.provinceName;
    url = "http://" + constPara.backEndUrl() + '/selectSpots/getAllCities';
    request({url: url, method: 'POST', form: {provinceName: provinceName}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let cities = JSON.parse(body)['cities'];
                res.send({'cities': cities});
            }
        })
});

router.post('/getAllSpots', function(req, res, next) {
    let cityName = req.body.cityName;
    url = "http://" + constPara.backEndUrl() + '/selectSpots/getAllSpots';
    request({url: url, method: 'POST', form: {cityName: cityName}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let spots = JSON.parse(body)['spots'];
                res.send({'spots': spots});
            }
        })
});

router.post('/submitSelectedSpots', function (req, res, next) {
    console.log(req.body);
})

module.exports = router;
