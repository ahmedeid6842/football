const User = require('../models/user');
const Message = require('../models/message');
module.exports.getChatPage = async (req, res) => {
    try {
        const result1 = await User.findOne({ 'username': req.user.username })
            .populate('request.userId')
            .exec();

        const nameRegex = new RegExp("^" + req.user.username.toLowerCase(), "i")
        const result2 = await Message.aggregate([
            { $match: { $or: [{ "senderName": nameRegex }, { "receiverName": nameRegex }] } },
            { $sort: { "createdAt": -1 } },
            {
                $group: {
                    "_id": {
                        "last_message_between": {
                            $cond: [
                                {
                                    $gt: [
                                        { $substrCP: ["$senderName", 0, 1] },
                                        { $substrCP: ["$receiverName", 0, 1] }]
                                },
                                { $concat: ["$senderName", " and ", "$receiverName"] },
                                { $concat: ["$receiverName", " and ", "$senderName"] }
                            ]
                        }
                    }, "body": { $first: "$$ROOT" }
                }
            }
        ]);
        const arr = [
            { path: 'body.sender', model: 'User' },
            { path: 'body.receiver', model: 'User' }
        ]
        await Message.populate(result2, arr);
        const result3 = await Message
            .find({
                '$or': [
                    { 'senderName': req.user.username },
                    { 'receiverName': req.user.username }
                ]
            })
            .populate('sender')
            .populate('receiver')
            .exec();
        const params = req.params.name.split('.');
        let nameParams = params[0];
        const receiverUser = await User.findOne({ 'username': nameParams.replace(/-/g, " ") });
        res.render('private/privatechat', {
            title: `Footballkik - Private Chat`,
            user: req.user,
            data: result1,
            chat: result2,
            chats: result3,
            name: nameParams,
            receiver: receiverUser
        });

    } catch (err) {
        res.send('error');
        console.log(err);
    }
}

module.exports.postChatPage = async (req, res) => {
    try {
        const params = req.params.name.split('.');
        let nameParams = params[0];
        nameParams = nameParams.replace(/-/g, " ")
        const nameRegex = new RegExp("^" + nameParams.toLowerCase(), "i");
        let data;
        const userId = req.user._id;
        if (req.body.message) {
            data = await User.findOne({ 'username': { $regex: nameRegex } });
            const newMessage = new Message({
                sender: req.user._id,
                receiver: data._id,
                senderName: req.user.username,
                receiverName: data.username,
                message: req.body.message,
                userImage: req.user.userImage
            })
            const result = await newMessage.save();
        }
        if (req.body.chatId) {
            await Message.update(
                {
                    '_id': req.body.chatId
                },
                {
                    "isRead": true
                })
        }
        res.redirect('/chat/' + req.params.name);
    } catch (err) {
        console.log(err);
    }
}






