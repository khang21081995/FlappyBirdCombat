class Client {
    constructor() {
        this.socket = io();

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



    }

    reportMove(id, direction, position) {
        this.socket.emit('bird_moved', {
            id: id,
            direction: direction,
            position: position
        });
    }


}
