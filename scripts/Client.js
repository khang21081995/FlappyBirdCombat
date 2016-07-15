class Client {
    constructor(username) {
        var that = this;
        this.socket = io();
        that.socket.emit('login', username);

        this.socket.on('connected', function(msg) {
            FlappyCombat.onConnected(msg);
        });
        this.socket.on('other_players', function(msg) {
            FlappyCombat.onReceivedOtherPlayersData(msg);
        });
        this.socket.on('new_player_connected', function(msg) {
            FlappyCombat.onReceivedNewPlayerData(msg);
        });
        this.socket.on('player_moved', function(msg) {
            FlappyCombat.onPlayerMoved(msg);
        });
        this.socket.on('player_level_up', function(msg) {
            FlappyCombat.onPlayerLevelUp(msg);
        });

        this.socket.on('player_score_up', function(msg) {
            FlappyCombat.onPlayerScoreUp(msg);
        });

        this.socket.on('player_died', function(msg) {
            FlappyCombat.onPlayerDied(msg);
        });
    }

    reportMove(id, direction, position) {
        this.socket.emit('bird_moved', {
            id: id,
            direction: direction,
            position: position
        });
        //console.log('reportMove client: ');
        //  console.log('position: ' + position);
        // console.log('direction: '+direction);
    }

    reportLevelUp(id, level) {
        this.socket.emit('bird_level_up', {
            id: id,
            level: level
        });
        //console.log('level= ' + level);
    }
    reportScoreUp(id, score) {
        this.socket.emit('bird_score_up', {
            id: id,
            score: score
        });
    }

    reportDied(id) {
        this.socket.emit('bird_died', {
            id: id
        });
    }

}
