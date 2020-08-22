const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    senderName: { type: String },
    receiverName: { type: String },
    userImage: { type: String, default: 'default.png' },
    isRead: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);