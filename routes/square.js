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

router.post('/showRouteInPage', function (req, res, next) {
    let page = req.body.page;
    let number_in_a_page = 10;
    url = 'http://' + constPara.backEndUrl() + '/square/showAllRoute';
    request({url: url, method: 'POST'},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let list = JSON.parse(body)['list'];
                console.log(list);
                let len = list.length;
                let pageCount = Math.ceil(len/number_in_a_page);
                let start = (page-1)*number_in_a_page;
                let end = page*number_in_a_page;
                if (end > len) {
                    end = len;
                }
                // console.log(start, end);
                let return_list = list.slice(start, end);
                res.send({pageCount: pageCount, list: return_list});
            }
        })
})

router.post('/getSelectedRoute', function (req, res, next) {
    let user = req.session.name;
    let detailRouteID = req.body.detailRouteID;
    console.log({user:user, detailRouteID: detailRouteID});
    url = 'http://' + constPara.backEndUrl() + '/square/getSelectedRoute';
    request({url: url, method: 'POST', form: {user:user, detailRouteID: detailRouteID}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let detaileRoute = JSON.parse(body);
                res.send(detaileRoute);
            }
        })
})

router.post('/joinRoute', function (req, res, next) {
    let user = req.session.name;
    let detailRouteID = req.body.detailRouteID;
    console.log({user: user, detailRouteID: detailRouteID});
    url = 'http://' + constPara.backEndUrl() + '/square/joinRoute';
    request({url: url, method: 'POST', form: {user: user, detailRouteID: detailRouteID}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let success = JSON.parse(body)['success'];
                res.send({success: success});
            }
        })
})

router.post('/voteRoute', function (req, res, next) {
    let user = req.session.name;
    let voteFor = req.body.voteFor;
    let detailRouteID = req.body.detailRouteID;
    console.log({user: user, voteFor: voteFor, detailRouteID: detailRouteID});
    url = 'http://' + constPara.backEndUrl() + '/square/voteRoute';
    request({url: url, method: 'POST', form: {user: user, voteFor: voteFor, detailRouteID: detailRouteID}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let success = JSON.parse(body)['success'];
                res.send({success: success});
            }
        })
})

router.post('/bidForRoute', function (req, res, next) {
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