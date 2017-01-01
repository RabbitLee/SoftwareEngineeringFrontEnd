/**
 * Created by RabbitLee on 01/01/2017.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendfile('./views/personInfo.html');
});

module.exports = router;
