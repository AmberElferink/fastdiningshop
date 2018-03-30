var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/ajaxcall', function(req, res, next) {
    res.render('shop/products', { title: 'Buy Products' });

    var data = {
        contactId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@domain.com',
        phone: '987654'
    };
    res.send(data);
});

module.exports = router;
