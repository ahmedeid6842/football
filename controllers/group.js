const User = require('../models/user');
const Message = require('../models/message');
const Group = require('../models/groupmessage');
module.exports.getGroup = async (req, res) => {
    const name = req.params.name;
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
    const pop = await Message.populate(result2, arr);
    const messages = await Group
        .find({})
        .populate('sender')
        .exec()
    res.render('groupchat/group', {
        title: `Foot-kik`,
        groupName: name,
        user: req.user,
        data: result1,
        chat: result2,
        groupMsg: messages
    });
}

module.exports.postGroup = async (req, res) => {
    try {
        if (req.body.receiverName) {
            // console.log(req.body);
            const test = await User.findOne({
                'username': req.body.receiverName,
            })
            console.log(test);
            const user = await User.updateOne({
                'username': req.body.receiverName,
                'request.userId': { $ne: req.user._id },
                'friendsList.friendId': { $ne: req.user._id }
            }, {
                $push: {
                    request: {
                        userId: req.user._id,
                        username: req.user.username
                    }
                },
                $inc: { totalRequest: 1 }
            });
            await User.updateOne({
                'username': req.user.username,
                'sendRequest.username': { $ne: req.body.receiverName }
            }, {
                $push: {
                    sendRequest: {
                        username: req.body.receiverName
                    }
                }
            })

            res.redirect(`/group/${req.params.name}`)
        } if (req.body.senderId) {
            await User.update({
                '_id': req.user._id,
                'friendList.friendId': { $ne: req.body.senderId }
            }, {
                $push: {
                    friendsList: {
                        friendId: req.body.senderId,
                        friendName: req.body.senderName
                    }
                },
                $pull: {
                    request: {
                        userId: req.body.senderId,
                        username: req.body.senderName
                    }
                },
                $inc: {
                    totalRequest: -1
                }
            })

            await User.update({
                '_id': req.body.senderId,
                'friendList.friendId': { $ne: req.user._id }
            }, {
                $push: {
                    friendsList: {
                        friendId: req.user._id,
                        friendName: req.user.username
                    }
                },
                $pull: {
                    sendRequest: {
                        username: req.user.username
                    }
                },
            });
        } if (req.body.user_Id) {

            await User.update({
                '_id': req.user._id,
                'request.userId': { $eq: req.body.user_Id }
            }, {
                $pull: {
                    request: {
                        userId: req.body.user_Id
                    }
                },
                $inc: { totalRequest: -1 }
            });
            await User.update({
                '_id': req.body.user_Id,
                'sendRequest.username': { $eq: req.user.username }
            }, {
                $pull: {
                    sendRequest: {
                        username: req.user.username
                    }
                }
            });
        }
        if (req.body.message) {
            const message = new Group({
                sender: req.user._id,
                body: req.body.message,
                name: req.body.groupName,
            })
            await message.save();
            res.redirect(`/group/${req.params.name}`)
        }

    }
    catch (err) {
        res.redirect(`/group/${req.params.name}`);
        console.log(err);
    }





}