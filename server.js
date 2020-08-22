const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const validator = require('express-validator');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const lodash = require('lodash');
const socketIO = require('socket.io');

const { Users } = require('./middleware/UsersClass');
const { Global } = require('./middleware/Global');

const user = require('./routes/users');
const admin = require('./routes/admin');
const home = require('./routes/home');
const group = require('./routes/group');
const result = require('./routes/results');
const privatechat = require('./routes/privatechat');
const profile = require('./routes/profile');
const interest = require('./routes/interest');
const news = require('./routes/news');

require('./middleware/passport/passport-local');
require('./middleware/passport/passport-facebook');
require('./middleware/passport/passport-google');


const app = express();
const server = http.createServer(app);
const io = socketIO(server)
const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session'
})


require('./socket/groupchat')(io, Users);
require('./socket/friend')(io);
require('./socket/globalroom')(io, Global, lodash);
require('./socket/privatemessage')(io);

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser('keyboard cat'));
app.use(validator());
app.use(session({
    secret: 'thisissecret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 100
    }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.locals._ = lodash;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS ,GET, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(user)
app.use(admin)
app.use(home);
app.use(group);
app.use(result);
app.use(privatechat);
app.use(profile);
app.use(interest);
app.use(news);
app.use((req, res) => {
    res.render('404');
})

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://ahmed:m75321598654@cluster0-bysax.mongodb.net/footballkik', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    server.listen(PORT, console.log(`listeing on port ${PORT}`))
}).catch((err) => {
    console.log(err);
})


