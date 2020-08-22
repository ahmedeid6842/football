const passport = require('passport');
const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let user = await User
        .findOne()
        .or([{ 'email': email }, { 'username': req.body.username }]);
    if (user) return done(null, false, req.flash('error', "User with email already exsist"));

    const newUser = new User({
        username: req.body.username,
        fullname: req.body.username,
        email: req.body.email,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(req.body.password, salt);

    user = await newUser.save();
    done(null, user);
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ 'email': email });
    if (!user) {
        return done(null, false, req.flash('error', "that Email is not Registered"))
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        return done(null, user);
    } else {
        return done(null, false, req.flash('error', "this password isn't correct "))
    }
}));
