const passport = require('passport');
const facebookStrategy = require('passport-google-oauth20').Strategy;
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
    clientID: secret.google.clientID,
    clientSecret: secret.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
        google: profile.id,
        fullname: profile.displayName,
        username: profile.displayName,
        userImage: profile.photos[0].value,
        username: profile.displayName,
        email: profile.id
    }
    try {
        let user = await User.findOne({ google: profile.id });
        if (user) {
            done(null, user);
        } else {
            user = await User.create(newUser);
            done(null, user);
        }
    } catch (err) {
        console.log(err);
    }
}))

// try {
//     let user = await User
//         .findOne({ google: profile.id });
//     if (user) {
//         return done(null, user)
//     } else {
//         const newUser = new User({
//             google: profile.id,
//             fullname: profile.displayName,
//             email: profile.emails[0].value,
//             userImage: profile._json.image.url,
//         });
//         user = await newUser.save();
//         done(null, user);
//     }
// } catch (err) {
//     done(err, false, err.message);
// }
