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

    socket.on('login', function(msg) {
        var newPlayerInfo = {
            id: socket.id,
            username: msg,
            x: Math.random() * 6016,
            y: Math.random() * 1024,
            level: 1,
            score: 0
        }
        console.log(newPlayerInfo.username);
        socket.emit('other_players', players);
        // Tell the new player where to initiate his bird
        socket.emit('connected', newPlayerInfo);
        // Tell all other players where to initiate new player's bird
        socket.broadcast.emit('new_player_connected', newPlayerInfo);
        // Add new player's info to the array of all players
        players.push(newPlayerInfo);
    });
    //  console.log('user1:'+username);
    // Send all players' data to the new player


    socket.on('bird_moved', function(data) {
        var playerInfo = getPlayerById(data.id, false);
        playerInfo.x = data.position.x;
        playerInfo.y = data.position.y;
        socket.broadcast.emit('player_moved', data);
        //  console.log('bird_moved'+data.id+' : '+data.position);
    });

    socket.on('bird_level_up', function(data) {
        var playerInfo = getPlayerById(data.id, false);
        playerInfo.level = data.level;
        //  console.log('level sever= ' + data.level);
        socket.broadcast.emit('player_level_up', playerInfo);
    });

    socket.on('bird_score_up', function(data) {
        var playerInfo = getPlayerById(data.id, false);
        playerInfo.score = data.score;
        //console.log('Server score = ' + data.score);
        socket.broadcast.emit('player_score_up', playerInfo);
    });


    socket.on('bird_died', function(data) {
        var playerInfo = getPlayerById(data.id, true);
        socket.broadcast.emit('player_died', playerInfo);
    });
});

http.listen(3012, function() {
    console.log('Server started. Listening on *:3012');
});
