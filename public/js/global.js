
$(document).ready(function () {
    let socket = io();
    console.log('welcome');
    socket.on('connect', function () {
        let room = 'Global Room';
        let name = $('#name-user').val();
        let img = $('#name-image').val();
        socket.emit('global room', {
            room: room,
            name: name,
            img: img
        });
        
        socket.on('message display', function () {
            $('#reload').load(location.href + ' #reload');
        })

    });

    socket.on('loggedInUser', function (users) {
        let friends = $('.friend').text();
        let friend = friends.split('@');
        let name = $('#name-user').val().toLowerCase();
        let ol = $('<div></div>')
        let arr = [];
        for (let i = 0; i < users.length; i++) {
            if (friend.indexOf(users[i].name) > -1) {
                arr.push(users[i]);
                let userName = users[i].name.toLowerCase();
                let list = `<img src="https://placehold.it/300x300" class="pull-left img-circle" style="width:50px; marign-right:10px;" />
                <p><a id="val" href="/chat/${userName.replace(/ /g, "-")}.${name.replace(/ /g, "-")}"><h3 style="padding-top:15px; color:gray; font-size:14px;">@
                ${users[i].name}<span class="fa fa-circle online_friend"></span></h3></a></p>
                `
                ol.append(list);
            }
        }
        $('#numOfFriends').text('(' + arr.length + ')');
        $('.onlineFriends').html(ol);
    })
})



