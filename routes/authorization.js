const express = require('express');
const router = express.Router();
const User = require('../models/users')
router.get('/login', function (req, res) {
    res.render('auth/login', {
        title: 'LOG'
    })
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
});

router.post('/login', async (req, res) => {
    const user = await User.findById
/*
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try{
        await user.save()
        res.redirect('/')
    }
    catch(e){
        console.log(e)
    }
 */

    req.session.isAuthenticated = true
    req.session.save(err =>{
        if(err){
            throw err
        }else{
            res.redirect('/')
        }
    })
  
});
module.exports = router;


