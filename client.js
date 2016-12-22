var host = process.argv[2] || 'http://localhost';
var port = process.argv[3] || 3000;
var clientIdentifier = process.argv[4] || 'default client';


var Client = function (host, port, clientIdentifier) {
    console.log('');
    console.log('User connecting (' + clientIdentifier + '):  ' + host + ':' + port);
    var socket = require('socket.io-client')(host + ':' + port, {transports: ['websocket'], timeout: 60000});
    console.log('User connecting (' + clientIdentifier + ') ...  after socket' );

    socket.on('connect', function(){
        console.log('User connected: ' + clientIdentifier);
    });
    socket.on('disconnect', function(){
        console.log('User disconnected: ' + clientIdentifier);
    });
    socket.on('connect_error', function(error){
        console.log('[' + clientIdentifier + '] connect_error');
        console.log(error);
    });
    socket.on('connect_timeout', function(data){
        console.log('connect_timeout');
    });
    socket.on('reconnect', function(data){
        console.log('[' + clientIdentifier + '] reconnect');
    });
    socket.on('reconnect_attempt', function(data){
        console.log('[' + clientIdentifier + '] reconnect_attempt');
    });
    socket.on('reconnecting', function(data){
        console.log('[' + clientIdentifier + '] reconnecting');
    });
    socket.on('reconnect_error', function(data){
        console.log('[' + clientIdentifier + '] reconnect_error');
    });
    socket.on('event', function(data){
        console.log('event');
    });

    console.log('User connecting (' + clientIdentifier + '): finish');
}

// var client = new Client(host, port, clientIdentifier);
module.exports = Client