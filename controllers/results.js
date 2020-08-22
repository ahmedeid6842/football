const Club = require('../models/clubs');
const Users = require('../models/user');
module.exports.getResults = (req, res) => {
    res.redirect('/home');
}

module.exports.postResults = async (req, res) => {
    const regex = new RegExp((req.body.country), 'gi');
    const result = await Club.find({ $or: [{ 'coutry': regex }, { 'name': regex }] });
    const res1 = result[0];
    const dataChunk = [];
    const chunkSize = 3;
    for (let i = 0; i < result.length; i += chunkSize) {
        dataChunk.push(result.slice(i, i + chunkSize));
    }
    res.render('results', {
        title: 'Footballkik - Results',
        user: req.user,
        chunks: dataChunk
    });
}

module.exports.viewMembers = async (req, res) => {
    const result = await Users.find();
    const dataChunk = [];
    const chunkSize = 4;
    for (let i = 0; i < result.length; i += chunkSize) {
        dataChunk.push(result.slice(i, i + chunkSize));
    }
    res.render('members', {
        title: 'Footballkik - Members',
        user: req.user,
        chunks: dataChunk
    });
}

module.exports.searchMembers = async (req, res) => {
    const regex = new RegExp((req.body.username), 'gi');
    const result = await Users.find({ 'username': regex });
    const dataChunk = [];
    const chunkSize = 4;
    for (let i = 0; i < result.length; i += chunkSize) {
        dataChunk.push(result.slice(i, i + chunkSize));
    }
    res.render('members', {
        title: 'Footballkik - Members',
        user: req.user,
        chunks: dataChunk
    });
}