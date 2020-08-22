
$(document).ready(() => {
    let socket = io();

    let room = $('#groupName').val();
    let sender = $('#sender').val();

    let userPic = $('#name-image').val();

    socket.on('connect', () => {
        console.log('user connected')
        console.log(`"${sender}"`);
        const params = {
            room: room,
            name: sender
        }
        socket.emit('join', params, () => {
            console.log('user has joined to this channel');
        })
    });
    socket.on('usersList', function (users) {
        let ol = $('<ol></ol>');
        for (let i = 0; i < users.length; i++) {
            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">' + users[i] + '</a></p>');
        }
        console.log('user list here');
        $(document).on('click', '#val', function () {
            $('#name').text('@' + $(this).text());
            $('#receiverName').val($(this).text());
            $('#nameLink').attr("href", "/profile/" + $(this).text());
        });

        $('#numValue').text('(' + users.length + ')');
        $('#users').html(ol);
    });

    socket.on('newMessage', (data) => {
        let template = $('#message-template').html();
        let message = Mustache.render(template, {
            text: data.text,
            sender: data.from,
            userImage:data.image
        })

        $('#messages').append(message);
    })

    $('#message-form').on('submit', (e) => {
        e.preventDefault();

        let msg = $('#msg').val();

        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender,
            userPic: userPic
        }, () => {
            $('#msg').val('');
        });

        $.ajax({
            url: `/group/${room}`,
            type: 'POST',
            data: {
                message: msg,
                groupName: room
            },
            success: function () {
                $('#msg').val('');
            }
        })

    })


})
