

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addUserName', { title: 'AddUserName',  });

});
module.exports = router;