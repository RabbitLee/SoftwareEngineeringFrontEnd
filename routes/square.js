/**
 * Created by zhaoangyouyou on 05/01/2017.
 */

var express = require('express');
var router = express.Router();
let constPara = require('./constPara');
var request = require('request');

router.get('/', function(req, res, next) {
    if (!req.session.name) {
        whetherLogin = '登录/注册';
        whetherLoginHref = '/login';
    } else {
        whetherLogin = '用户中心';
        whetherLoginHref = '/personInfo';
    }

    // console.log(req.session.name);

    res.render('../public/square', {whetherLogin: whetherLogin, whetherLoginHref: whetherLoginHref});
});

router.post('/', function (req, res, next) {
    url = 'http://' + constPara.backEndUrl() + '/square/showAllRoute';
    request({url: url, method: 'POST'},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let allRoute = JSON.parse(body);
                res.send(allRoute);
            }
        })
})

router.post('/', function (req, res, next) {
    let detailedRouteID = req.body.datailedRouteID;
    url = 'http://' + constPara.backEndUrl() + '/square/getSelectedRoute';
    request({url: url, method: 'POST', form: {detailedRouteID: detailedRouteID}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let detaileRoute = JSON.parse(body);
                res.send(detaileRoute);
            }
        })
})

router.post('/', function (req, res, next) {
    let user = req.session.name;
    let routeid = req.body.routeid;
    url = 'http://' + constPara.backEndUrl() + '/square/voteRoute';
    request({url: url, method: 'POST', form: {user: user, routeid: routeid}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let success = JSON.parse(body)['success'];
                res.send({success: success});
            }
        })
})

router.post('/', function (req, res, next) {
    let user = req.session.name;
    let voteFor = req.body.voteDor;
    url = 'http://' + constPara.backEndUrl() + '/square/joinRoute';
    request({url: url, method: 'POST', form: {user: user, voteFor: voteFor}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let success = JSON.parse(body)['success'];
                res.send({success: success});
            }
        })
})

router.post('/', function (req, res, next) {
    let agency = req.session.name;
    let bidFor = req.body.bidFor;
    let fare = req.body.fare;
    url = 'http://' + constPara.backEndUrl() + '/square/bidForRoute';
    request({url: url, method: 'POST', form: {agency: agency, bidFor: bidFor, fare: fare}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let success = JSON.parse(body)['success'];
                res.send({success: success});
            }
        })
})

module.exports = router;