var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('shop/products', { title: 'Buy Products' });
});

app.get('/ajaxcall', function (req, res) {
    var data = {
        contactId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@domain.com',
        phone: '9876454'
    };
    res.send(data);
});

module.exports = router;