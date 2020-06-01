const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', auth, function (req, res) {
    res.render('wallet/index', {
        title: 'Вход',
        isLogin: true
    })
})

router.get('/all', auth, function (req, res) {
    res.json('{"paper": "A4", "count": 5}')
})

module.exports = router