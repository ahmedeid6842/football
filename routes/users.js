const express = require('express');
const passport = require('passport');
const { body, check, validationResult } = require('express-validator/check');
const { isLoggedIn, LoggedIn } = require("../middleware/forceInOut");
const router = express.Router();

const usersControllers = require('../controllers/users')

router.get('/', usersControllers.getIndex);

router.post('/', [check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Email is invalid'),
check('password')
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('Password is required and must be at least 5 characters.')
], usersControllers.validation, passport.authenticate('local.login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}))

router.get('/signup', usersControllers.getSignup);

router.post('/signup', [
    check('username')
        .not()
        .isEmpty()
        .isLength({ min: 5 }).
        withMessage('Username is required and must be at least 5 characters.'),
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Email is invalid'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required and must be at least 5 characters.'),
], usersControllers.validation, passport.authenticate('local.signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}));


router.get(
    "/auth/facebook",
    passport.authenticate("facebook"),
    passport.authorize("facebook", { scope: ["email"] }),
    LoggedIn
);

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }),
    LoggedIn
)

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}))
router.get(
    '/auth/google/callback',
    passport.authenticate("google", {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    })
)



module.exports = router;

