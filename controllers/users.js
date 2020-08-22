const { body, check, validationResult } = require('express-validator/check');
const passport = require('passport');
const router = require('../routes/users');

module.exports.getIndex = (req, res) => {
    const errors = req.flash('error');
    res.render('index', {
        messages: errors,
        hasErrors: errors.length > 0
    });
}

module.exports.getSignup = (req, res) => {

    const errors = req.flash('error');
    res.render('signup', {
        title: 'Footballkk | Login',
        messages: errors,
        hasErrors: errors.length > 0
    });
}

module.exports.validation = (req, res, next) => {
    const err = validationResult(req).array();
    let messages = [];
    if (err.length > 0) {
        err.forEach((error) => {
            messages.push(error.msg)
        })

        req.flash('error', messages);
        if (req.url === '/signup') {
            res.redirect('/signup')
        } else if (req.url == '/') {
            res.redirect('/');
        }
    } else {
        return next();
    }
}


module.exports.getFacebookLogin = passport.authenticate('facebook', {
    scope: 'email'
})

module.exports.facebookLogin = passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
})

