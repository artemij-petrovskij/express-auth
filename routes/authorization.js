const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.get('/login', function (req, res) {
    res.render('account/login', {
        title: 'Вход',
        isLogin: true,
        loginErr: req.flash('loginErr')
    })
});
router.get('/signup', function (req, res) {
    res.render('account/signup', {
        title: 'Регистрация',
        isSignUp: true,
        signupErr: req.flash('signupErr')
    })
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const issetUser = await User.findOne({ email })

    if (issetUser) {
        //user существует
        if (password === issetUser.password) {
            req.session.isAuthenticated = true
            req.session.save(err => {
                if (err) {
                    throw err
                } else {
                    res.redirect('/')
                }
            })
        }else{
            req.flash('loginErr','Введен неправильный пароль')
            res.redirect('/account/login')
        }
    } else {
        req.flash('loginErr','Пользователя с таким email не существует')
        res.redirect('/account/login')
    }



})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const issetUser = await User.findOne({ email })
    if (issetUser) {
        req.flash('signupErr','Пользователь с таким email зарегистрирован')
        res.redirect('/account/signup')

    } else {
        const newUser = new User({
            email: email,
            password: password
        })

        try {
            await newUser.save()
            req.session.isAuthenticated = true
            req.session.save(err => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/')
                }
            })

        }
        catch (e) {
            console.log(e)
        }
    }



})


router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/account/login')
    })
})


module.exports = router


