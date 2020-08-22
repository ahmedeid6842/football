const mongoose = require('mongoose');

const groupMessage = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: { type: String },
    name: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('GroupMessage', groupMessage);