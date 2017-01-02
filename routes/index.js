/**
 * Created by RabbitLee on 01/01/2017.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (!req.session.name) {
        whetherLogin = '登录/注册';
        whetherLoginHref = '/login';
    } else {
        whetherLogin = '用户中心';
        whetherLoginHref = '/personInfo';
    }
    // console.log(req.session.name);

    res.render('../public/index', {whetherLogin: whetherLogin, whetherLoginHref: whetherLoginHref});
});

module.exports = router;
