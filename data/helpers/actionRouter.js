const express = require('express');
const db = require('./actionModel.js');
const router = express();

router.get('/', (req, res) => {
    db.get()
        .then( data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({errorMessage: "there was a problem retrieving action data from the server!"});
        })

});



module.exports = router; 