module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('join PM', (pm, callback) => {
            socket.join(pm.room1);
            socket.join(pm.room2);
        });
        socket.on('private message', (message, callback) => {
            io.to(message.room).emit('new message', {
                text: message.text,
                sender: message.sender
            });
            io.emit('message display', {});
            callback();
        })
        socket.on('refresh', function () {
            io.emit('new refresh', {});
        })
    })
}