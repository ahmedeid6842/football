module.exports = (io, Global, lodash) => {
    const clients = new Global();
    io.on('connection', (socket) => {
        socket.on('global room', (global) => {
            socket.join(global.room);
            clients.EnterRoom(socket.id, global.name, global.room, global.img);

            let nameProp = clients.GetRoomList(global.room);
            const arr = lodash.uniqBy(nameProp, 'name');
            io.to(global.room).emit('loggedInUser', arr)
        });
        socket.on('disconnect', () => {
            const user = clients.RemoveUser(socket.id);
            if (user) {
                let userData = clients.GetRoomList(user.room);
                const arr = lodash.uniqBy(userData, 'name');
                const removeData = lodash.remove(arr, { 'name': user.name })
                io.to(user.room).emit('loggedInUser', arr)
            }
        })
    })
}