const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    fullname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    userImage: {
        type: String,
        default: 'https://res.cloudinary.com/dj2yju5sd/image/upload/v1598091690/unknown-512_wvydzh.png'
    },
    facebook: {
        type: String,
        default: ''
    },
    fbToken: Array,
    google: {
        type: String,
        default: ''
    },
    googleToken: Array,
    sendRequest: [{
        username: { type: String, default: '' }
    }],
    request: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String, default: '' }
    }],
    friendsList: [{
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        friendName: { type: String, default: '' }
    }],
    totalRequest: { type: Number, default: 0 },
    gender: { type: String, default: '' },
    country: { type: String, default: '' },
    mantra: { type: String, default: "I'm a new User" },
    favNationalTeam: [{
        team: { type: String, default: '' }
    }],
    favPlayer: [{
        playerName: { type: String, default: '' }
    }],
    favClub: [{ 
        clubName: { type: String, default: '' }
    }]
});



userSchema.methods.validUserPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model('User', userSchema);