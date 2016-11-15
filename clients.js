var fork = require('child_process').fork;
var async = require('async');
var amountConcurrentUsers = process.argv[2] || 200;
var host = process.argv[3] || 'http://localhost';
var initialPort = process.argv[4] || 3000;
var totalServers = process.argv[5] || 50;
var Client = require('./client');
var defaultHAProxyPort = 80;

var clientIdentifiers = [];
var clients = [];

for(var i = 0; i < amountConcurrentUsers; i++) {
    clientIdentifiers.push(i);
};

console.log('Here we go');
console.log('amountConcurrentUsers: ' + amountConcurrentUsers);
console.log('Host: ' + host);
console.log('Initial port: ' + initialPort);

for(var j = 0; j < totalServers; j++) {
    var port =  (isHAProxyPort(defaultHAProxyPort, initialPort)) ? defaultHAProxyPort : initialPort + j;
    console.log('Connecting to port: ' + port);
    async.each(clientIdentifiers, function(clientIdentifier) {
        // clients[clientIdentifier] = fork('client.js', [host, port, clientIdentifier] );
        console.log('Client: ' + clientIdentifier);
        clients[clientIdentifier] = Client(host, port, port + '-' + clientIdentifier);
    }, function(err){
        console.log('UPSSS! Error!');
    });
}


function isHAProxyPort(defaultHAProxyPort, port) {

    return port === defaultHAProxyPort;
}