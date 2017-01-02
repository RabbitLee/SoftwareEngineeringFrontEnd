var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.session.isVisit) {
        req.session.isVisit++;
    } else {
        req.session.isVisit = 1;
    }
    console.log('visit time: ');
    console.log(req.session.isVisit);
    res.sendfile('./views/test.html');
});

module.exports = router;
