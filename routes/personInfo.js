/**
 * Created by RabbitLee on 01/01/2017.
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
    res.render('../public/personInfo', {whetherLogin: whetherLogin, whetherLoginHref: whetherLoginHref});
});

router.post('/showRouteInPage', function (req, res, next) {
    let page = req.body.page;
    let name = req.session.name;
    let number_in_a_page = 10;
    url = 'http://' + constPara.backEndUrl() + '/personInfo/showRouteInPage';
    request({url: url, method: 'POST', form: {userID: name}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                let list = JSON.parse(body)['list'];
                let len = list.length;
                let pageCount = Math.ceil(len/number_in_a_page);
                let start = (page-1)*number_in_a_page;
                let end = page*number_in_a_page;
                if (end > len) {
                    end = len;
                }
                console.log(list);
                console.log(start, end);
                let return_list = list.slice(start, end);
                res.send({pageCount: pageCount, list: return_list});
            }
        })
})

router.post('/showAllAgency', function (req, res, next) {
    let page = req.body.page;
    let name = req.session.name;
    let number_in_a_page = 10;
    url = 'http://' + constPara.backEndUrl() + '/personInfo/showAllAgency';
    request({url: url, method: 'POST', form: {userID: name}},
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

module.exports = router;
