/*
 * GAME EVENTS
 */

FlappyCombat.onConnected = function(data) {
    var bird = new Bird(data.x, data.y, FlappyCombat.birdGroup, data.id);
    FlappyCombat.inputController = new InputController(FlappyCombat.keyboard, bird);
    FlappyCombat.game.camera.follow(bird.sprite);

}

FlappyCombat.onReceivedOtherPlayersData = function(datas) {
    for (var i = 0; i < datas.length; i++) {
        FlappyCombat.enemies.push(
            new Bird(datas[i].x, datas[i].y, FlappyCombat.birdGroup, datas[i].id)
        );
    }
}
FlappyCombat.onReceivedNewPlayerData = function(data) {
    FlappyCombat.enemies.push(
        new Bird(data.x, data.y, FlappyCombat.birdGroup, data.id)
    );
}

FlappyCombat.onPlayerMoved = function(data) {
    var enemy = FlappyCombat.getPlayerById(data.id, false);
    enemy.sprite.position = data.position;
    enemy.update(data.direction);

}

FlappyCombat.onPlayerDied = function(data) {
    var enemy = FlappyCombat.getPlayerById(data.id, true);
    enemy.sprite.destroy();
}

FlappyCombat.onPlayerLevelUp = function(data){
  var enemy = FlappyCombat.getPlayerById(data.id, false);
  enemy.sprite.level = data.level;
}

FlappyCombat.onPlayerScoreUp = function(data){
  var enemy = FlappyCombat.getPlayerById(data.id, false);
  enemy.sprite.score = data.score;
}
