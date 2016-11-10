var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var amountConnectedUsers = 0;
app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
    console.log('a user connected');
    amountConnectedUsers++;
    console.log('Total connected users: ' + amountConnectedUsers);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        amountConnectedUsers++;
        console.log('Total connected users: ' + amountConnectedUsers);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});