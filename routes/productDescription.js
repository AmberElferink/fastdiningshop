//dit bestandje wordt alleen opgestart op het moment dat de server start

var express = require('express');
var router = express.Router();


//
router.get('/:barcode', function(req, res, next) {
    console.log(req.params.barcode);
    res.render(null, {title: 'Buy Products', layout: 'productDescriptionLayout', description: 'ik ben een banaan'});

    searchProducts(function (returnValues) {
        drawProducts(returnValues);
    }, "?products=" + this.value);
});




//zoekt producten in de database
function searchProducts(callback, search) {
    if(!search)
    {
        search = "";
    }
    $.ajax({
        type: 'GET',
        url: '/api/product'+search,
        dataType: 'json',
    })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {
            //deze done functie logt het naar de javascript console en print het op de pagina als txt
            //console.log('GET response:', JSON.stringify(data, "", 2));
            callback(data);
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

module.exports = router;