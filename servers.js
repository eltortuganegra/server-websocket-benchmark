var fork = require('child_process').fork;
var async = require('async');
var amountConcurrentServers = process.argv[2] || 50;
var port = process.argv[4] || 3000;
var servers = [];
var path = __dirname;

for(var i = 0; i < amountConcurrentServers; i++) {
    var portForServer = port + i;
    var serverIdentifier = i;
    console.log('Creating server: ' + serverIdentifier + ' - ' + portForServer + ' - ' + serverIdentifier);
    servers[i] = fork( path +'/server.js', [portForServer, serverIdentifier]);
}

process.on('exit', function() {
    console.log('exit process');
    for(var i = 0; i < amountConcurrentServers; i++) {
        servers[i].kill();
    }
});