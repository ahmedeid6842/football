

const User = require('../models/user');
const Message = require('../models/message');
const cloudinary = require('../middleware/cloudinary');

let image = '';
module.exports.getInterest = async (req, res) => {
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
    res.render('user/interest', {
        title: `Footballkik - Interest`,
        user: req.user,
        data: result1,
        chat: result2,
    });
}

module.exports.updateUserImg = async (req, res) => {
    image = await cloudinary.upload(req.files[0].path);
    console.log(image);
}

module.exports.postInterest = async (req, res) => {
    if (req.body.receiverName) {
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
    }
    if (req.body.favClub) {
        await User.update(
            {
                '_id': req.user._id,
                'favClub.clubName': { $ne: req.body.favClub }
            },
            {
                $push: {
                    favClub: {
                        clubName: req.body.favClub
                    }
                }
            }
        )
    }
    if (req.body.favPlayer) {
        await User.update(
            {
                '_id': req.user._id,
                'favPlayer.playerName': { $ne: req.body.favPlayer }
            },
            {
                $push: {
                    favPlayer: {
                        playerName: req.body.favPlayer
                    }
                }
            }
        )
    }
    if (req.body.nationalTeam) {
        await User.update(
            {
                '_id': req.user._id,
                'favNationalTeam.team': { $ne: req.body.nationalTeam }
            },
            {
                $push: {
                    favNationalTeam: {
                        team: req.body.nationalTeam
                    }
                }
            }
        )
    }
    res.redirect('/settings/interests');
}