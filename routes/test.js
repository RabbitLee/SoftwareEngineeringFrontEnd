var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // if (req.session.isVisit) {
    //     req.session.isVisit++;
    //     res.send('<p>' + 'test: ' + req.session.isVisit + '</p>')
    // } else {
    //     req.session.isVisit = 1;
    //     res.send('<p>test: 1</p>');
    // }
    res.sendfile('./public/test.html');
});

module.exports = router;
