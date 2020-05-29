const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('wallet/index', {
        title: 'Вход',
        isLogin: true 
    })
})


module.exports = router