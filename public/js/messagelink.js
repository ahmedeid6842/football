$(document).ready(function () {
    let socket = io();
    let paramOne = $.deparam(window.location.pathname);
    let newParam = paramOne.split('.');

    swap(newParam, 0, 1);
    let paramTwo = newParam[0] + '.' + newParam[1];
    socket.on('connect', function () {
        let params = {
            room1: paramOne,
            room2: paramTwo
        };
        socket.emit('join PM', params);
        socket.on('new refresh', function () {
            $('#reload').load(location.href + ' #reload');
        })
    });

    $(document).on('click', '#messageLink', function () {
        let chatId = $(this).data().value;
        $.ajax({
            url: `/chat/${paramOne}`,
            type: 'POST',
            data: { chatId: chatId },
            success: function () {
            }
        })
        socket.emit('refresh', {});
    })
})

function swap(input, value_1, value_2) {
    let temp = input[value_1];
    input[value_1] = input[value_2];
    input[value_2] = temp;
}