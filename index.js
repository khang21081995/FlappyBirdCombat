var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));


app.get('/', function(req, res) {
    res.sendFile(__dirname + 'index.html');
});

var players = [];
var getPlayerById = function(id, killKo) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == id) {
            return killKo ? players.splice(i, 1)[0] : players[i]; // splicce dung de xoa phan tu thu i trong mang
        }
    }
}

io.on('connection', function(socket) {
    console.log('New User Connected');

    // Send all players' data to the new player
    socket.emit('other_players', players);

    var newPlayerInfo = {
            id: socket.id,
            x: Math.random() * 6016,
            y: Math.random() * 1024,
            directionX: 1,
            directionY: 1,
            level: 1,
            score: 0
        }
        // Tell the new player where to initiate his bird
    socket.emit('connected', newPlayerInfo);
    // Tell all other players where to initiate new player's bird
    socket.broadcast.emit('new_player_connected', newPlayerInfo);
    // Add new player's info to the array of all players
    players.push(newPlayerInfo);

    socket.on('bird_moved', function(data) {
        var playerInfo = getPlayerById(data.id, false);

        playerInfo.x = data.position.x;
        playerInfo.y = data.position.y;
        playerInfo.directionX = data.direction.x;
        playerInfo.directionY = data.direction.y;
        console.log('data position: ' + data.position.x + ' : ' + playerInfo.y);
        //console.log('x= '+data.position.x+' : y= '+data.position.y);
        console.log('data direction: ' + playerInfo.directionX +' : '+playerInfo.directionY);
//        console.log('playerInfo.direction: '+playerInfo.direction);
        socket.broadcast.emit('player_moved', playerInfo);
    });


    socket.on('bird_level_up', function(data) {
        var playerInfo = getPlayerById(data.id, false);
        playerInfo.level = data.level;
        console.log('level sever= ' + data.level);
        socket.broadcast.emit('player_level_up', playerInfo);
    });

    socket.on('bird_score_up', function(data) {
        var playerInfo = getPlayerById(data.id, false);
        playerInfo.score = data.score;
        console.log('Server score = ' + data.score);
        socket.broadcast.emit('player_score_up', playerInfo);
    });



    socket.on('bird_died', function(data) {
        var playerInfo = getPlayerById(data.id, true);
        socket.broadcast.emit('player_died', playerInfo);
    });
});

http.listen(6969, function() {
    console.log('Server started. Listening on *:6969');
});
