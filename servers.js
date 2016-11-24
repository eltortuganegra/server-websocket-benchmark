var fork = require('child_process').fork;
var amountConcurrentServers = process.argv[2] || 2;
var port = initialPortServer();
var servers = [];
var path = __dirname;
var disableAutomaticGarbageOption = '--expose-gc';

for(var i = 0; i < amountConcurrentServers; i++) {
    var portForServer = port + i;
    var serverIdentifier = i;
    console.log('Creating server: ' + serverIdentifier + ' - ' + portForServer + ' - ' + serverIdentifier);
    servers[i] = fork( path +'/server.js', [portForServer, serverIdentifier], {execArgv: [disableAutomaticGarbageOption]});
}

process.on('exit', function() {
    console.log('exit process');
    for(var i = 0; i < amountConcurrentServers; i++) {
        servers[i].kill();
    }
});

function initialPortServer() {
    if(process.argv[3]) {

        return parseInt(process.argv[3]);
    }

    return 3000;
}
