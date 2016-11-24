var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {transports: ['websocket', 'flashsocket', 'polling']});
var port = process.argv[2] || 3000;
var identifier = process.argv[3] || 'default server';

var amountConnectedUsers = 0;

initializeGarbageCollection();

app.get('/', function(req, res){
    res.send('<h1>[server ' + identifier + '] Hello world</h1>');
});

io.on('connection', function(socket) {
    console.log('[server ' + identifier + ']  user connected');
    amountConnectedUsers++;
    console.log('[server ' + identifier + '] Total connected users: ' + amountConnectedUsers);

    socket.on('disconnect', function() {
        console.log('user disconnected');
        amountConnectedUsers--;
        console.log('[server ' + identifier + '] Total connected users: ' + amountConnectedUsers);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

function initializeGarbageCollection() {
    var sixtySecondsInMilliseconds = 60000;
    setInterval(function(){
        global.gc();
        console.log('[server ' + identifier + '] GC done')
    }, sixtySecondsInMilliseconds);
}