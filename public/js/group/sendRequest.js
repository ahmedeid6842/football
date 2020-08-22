
$(document).ready(() => {
    let socket = io();

    let room = $('#groupName').val();
    let sender = $('#sender').val();

    socket.on('connect', function () {

        let params = {
            sender
        }

        socket.emit('joinRequest', params, () => {
            console.log('join');
        })
    })

    socket.on('newFriendRequest', (friend) => {
        $('#reload').load(location.href + " #reload");
        $(document).on("click", "#accept_friend", () => {
            let senderId = $("#senderId").val();
            let senderName = $("#senderName").val();
            console.log('hereeeee');
            $.ajax({
                url: `/group/${room}`,
                type: 'POST',
                data: {
                    senderId: senderId,
                    senderName: senderName
                },
                success: () => {
                    $(this).parent().eq(1).remove();
                }
            })
            $('#reload').load(location.href + ' #reload');
        })
        $(document).on('click', '#cancel_friend', function () {
            let user_Id = $('#user_Id').val();

            $.ajax({
                url: '/group/' + room,
                type: 'POST',
                data: {
                    user_Id: user_Id
                },
                success: () => {
                    $(this).parent().eq(1).remove();
                }
            });
            $('#reload').load(location.href + ' #reload');
        });

    })

    $('#add_friend').on('submit', function (e) {
        e.preventDefault();

        let receiverName = $('#receiverName').val();
        let sender = $('#sender-name').val();
        $.ajax({
            url: '/group/' + room,
            type: 'POST',
            data: {
                receiverName: receiverName,
                sender: sender
            },
            success: function () {
                socket.emit('friendRequest', {
                    receiver: receiverName,
                    sender: sender
                }, function () {
                    console.log('Request Sent');
                })
            }
        })
    });
    $("#accept_friend").on("click", () => {
        let senderId = $("#senderId").val();
        let senderName = $("#senderName").val();
        $.ajax({
            url: `/group/${room}`,
            type: 'POST',
            data: {
                senderId: senderId,
                senderName: senderName
            },
            success: function () {
                $(this).parent().eq(1).remove();
            }
        })
        $('#reload').load(location.href + ' #reload');
    })

    $('#cancel_friend').on('click', function () {
        var user_Id = $('#user_Id').val();

        $.ajax({
            url: '/group/' + room,
            type: 'POST',
            data: {
                user_Id: user_Id
            },
            success: function () {
                $(this).parent().eq(1).remove();
            }
        });
        $('#reload').load(location.href + ' #reload');
    });

})