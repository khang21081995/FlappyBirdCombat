var FlappyCombat = {}


window.onload = function() {
    FlappyCombat.game = new Phaser.Game(window.innerWidth,
        window.innerHeight,
        Phaser.AUTO,
        '', {
            preload: preload,
            create: create,
            update: update
        }
    );
}

//load resource
var preload = function() {
    FlappyCombat.game.load.image('birdLeftlv1', './images/lv1_left.png');
    FlappyCombat.game.load.image('birdRightlv1', './images/lv1_right.png');
    FlappyCombat.game.load.image('birdLeftlv2', './images/lv2_left.png');
    FlappyCombat.game.load.image('birdRightlv2', './images/lv2_right.png');
    FlappyCombat.game.load.image('birdLeftlv3', './images/lv3_left.png');
    FlappyCombat.game.load.image('birdRightlv3', './images/lv3_right.png');
    FlappyCombat.game.load.image('birdLeftlv4', './images/lv4_left.png');
    FlappyCombat.game.load.image('birdRightlv4', './images/lv4_right.png');
    FlappyCombat.game.load.image('birdLeftlv4', './images/lv5_left.png'); //TODO lam cai anh con chim ben trai xem nao
    FlappyCombat.game.load.image('birdRightlv4', './images/lv5_right.png');

    FlappyCombat.game.load.image('food', './images/trees.png');
    FlappyCombat.game.load.image('food2', './images/Nintendo-Button-B.png');
    FlappyCombat.game.load.image('barrie', './images/big_explosion_5.png');
    FlappyCombat.game.load.image('background', './images/map.png');
}

var numberOfFood = 0;
var create = function() {
    FlappyCombat.client = new Client();
    FlappyCombat.game.add.tileSprite(0, 0, 6000, 1000, "background");
    FlappyCombat.game.physics.startSystem(Phaser.Physics.ARCADE);
    FlappyCombat.keyboard = FlappyCombat.game.input.keyboard;
    //FlappyCombat.game.physics.arcade.gravity.y = 10;
    FlappyCombat.birdGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.foodGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.barieGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.enemies = [];

    FlappyCombat.game.world.setBounds(0, 0, 6000, 1000);

    // for (var i = 0; i < 20; i++) {
    //     new Barrie(FlappyCombat.game.world.randomX, FlappyCombat.game.world.randomY, FlappyCombat.barieGroup);
    // }


}


var update = function() {
    if (numberOfFood < 100) {
        new Food(FlappyCombat.game.world.randomX, FlappyCombat.game.world.randomY, FlappyCombat.foodGroup, Math.round(Math.random()));
        numberOfFood++;
    }

    FlappyCombat.game.physics.arcade.overlap(
        FlappyCombat.birdGroup,
        FlappyCombat.foodGroup,
        onFoodMeetBird,
        null,
        this
    );

    FlappyCombat.game.physics.arcade.overlap(
        FlappyCombat.birdGroup,
        FlappyCombat.barieGroup,
        onBarieMeetBird,
        null,
        this
    );

    FlappyCombat.game.physics.arcade.overlap(
        FlappyCombat.foodGroup,
        FlappyCombat.barieGroup,
        onBarieMeetFood,
        null,
        this
    );

    if (FlappyCombat.inputController) FlappyCombat.inputController.update();
}

/*
 *  HELPER FUNCTIONS
 */


/*
 * PHYSICS EVENTS
 */

var onFoodMeetBird = function(birdSprite, foodSprite) {

    birdSprite.score += foodSprite.score;
    if (birdSprite.score >= 50 && birdSprite.score < 100) {
        birdSprite.level = 2;
    } else if (birdSprite.score >= 100 && birdSprite.score < 300) {
        birdSprite.level = 3;
    } else if (birdSprite.score >= 300 && birdSprite.score < 550) {
        birdSprite.level = 4;
    } else if (birdSprite.score >= 550) {
        birdSprite.level = 5;
    }

    foodSprite.kill();
    numberOfFood--;
    //foodSprite.destroy();
}

var onBarieMeetBird = function(birdSprite, barrieSprite) {
    birdSprite.kill();
    birdSprite.destroy();
}

var onBarieMeetFood = function(foodSprite, barrieSprite) {
    foodSprite.kill();
    numberOfFood--;
}

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

FlappyCombat.onPlayerFired = function(data) {
    var enemy = FlappyCombat.getPlayerById(data.id, false);
    enemy.sprite.position = data.position;
    new Bullet(enemy);
}

FlappyCombat.onPlayerDied = function(data) {
    var enemy = FlappyCombat.getPlayerById(data.id, true);
    enemy.sprite.destroy();
}
