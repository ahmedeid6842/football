const Clubs = require('../models/clubs');
const user = require('../models/user');
const Message = require('../models/message');
module.exports.homePage = async (req, res) => {
    try {

        let result = await Clubs.find({}).sort('name');
        let result2 = await Clubs.aggregate([
            { $group: { _id: '$coutry' } },
        ]).sort('_id');
        let result3 = await user
            .findOne({ 'username': req.user.username })
            .populate('request.userId')
            .exec();
        const dataChunk = [];
        const chunkSize = 3;
        for (let i = 0; i < result.length; i += chunkSize) {
            dataChunk.push(result.slice(i, i + chunkSize));
        }
        const nameRegex = new RegExp("^" + req.user.username.toLowerCase(), "i")
        const result4 = await Message.aggregate([
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
        await Message.populate(result4, arr);
        if (req.body.chatId) {
            await Message.update(
                {
                    '_id': req.body.chatId
                },
                {
                    "isRead": true
                })
        }
        res.render('home', {
            title: 'Footballkik - Home',
            user: req.user,
            chunks: dataChunk,
            country: result2,
            data: result3,
            chat: result4
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.postHomePage = async (req, res) => {
    try {
        await Clubs.update({
            '_id': req.body.id,
            'fans.username': { $ne: req.user.username }
        }, {
            $push: {
                fans: {
                    username: req.user.username,
                    email: req.user.email
                }
            }
        })



        res.redirect('/home');
    } catch (err) {
        console.log(err);
        res.redirect('/home');
    }
}

