const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const secret = require('../../secret/secret')

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
        done(err, user);
    })
});


passport.use(new facebookStrategy({
    clientID: secret.facebook.clientID,
    clientSecret: secret.facebook.clientSecret,
    callbackURL: "facebook.developer.com",
    profields: ['emails', 'name', 'displayname']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User
            .findOne({ facebook: profile.id });
        if (user) {
            return done(null, user)
        } else {
            const newUser = new User({
                facebook: profile.id,
                fullname: profile.displayName,
                username: profile.displayName,
                email: profile._json.email,
                userImage: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            });
            newUser.fbToken.push({ token: accessToken });
            user = await newUser.save();
            done(null, user);
        }
    } catch (err) {
        done(err, false, err.message);
    }
}))
