/**
 * Created by RabbitLee on 14/01/2017.
 */

var express = require('express');
var router = express.Router();
let constPara = require('./constPara');
var request = require('request');


router.post('/showAgencyRoute', function (req, res, next) {
    let page = req.body.page;
    let name = req.session.agencyName;
    let number_in_a_page = 10;
    url = 'http://' + constPara.backEndUrl() + '/agencyPersonInfo/showAgencyRoute';
    request({url: url, method: 'POST', form: {agencyname: name}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let list = JSON.parse(body)['list'];
                // console.log(list);
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
    let name = req.session.agencyName;
    let detailRouteID = req.body.detailRouteID;
    url = 'http://' + constPara.backEndUrl() + '/agencyPersonInfo/getSelectedRoute';
    request({url: url, method: 'POST', form: {agencyname: name, detailRouteID: detailRouteID}},
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body));
                res.send(JSON.parse(body));
            }
        })
})

module.exports = router;

