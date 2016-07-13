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
    FlappyCombat.game.load.image('birdDown', './images/tank_player1_down_c0_t1_s1.png'); //TODO doi anh di
    FlappyCombat.game.load.image('birdUp', './images/tank_player1_up_c0_t1_s1.png');
    FlappyCombat.game.load.image('birdLeft', './images/tank_player1_left_c0_t1_s1.png');
    FlappyCombat.game.load.image('birdRight', './images/tank_player1_right_c0_t1_s1.png');

    FlappyCombat.game.load.image('food', './images/bullet_right.png');
    FlappyCombat.game.load.image('background', './images/images.jpg');

}
var bird;
var create = function() {
    FlappyCombat.game.physics.startSystem(Phaser.Physics.ARCADE);
    FlappyCombat.keyboard = FlappyCombat.game.input.keyboard;
    FlappyCombat.game.physics.arcade.gravity.y = 10;
    FlappyCombat.birdGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.foodGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.game.world.setBounds(0, 0, 10000, 1000);
    bird = new Bird(500, 500, FlappyCombat.birdGroup, 1);
    FlappyCombat.inputController = new InputController(FlappyCombat.keyboard, bird);
    FlappyCombat.game.camera.follow(bird.sprite);
    for (var i = 0; i < 100; i++) {
        FlappyCombat.game.add.sprite(FlappyCombat.game.world.randomX, FlappyCombat.game.world.randomY, 'background');
    }


}


var update = function() {
    new Food(FlappyCombat.game.world.randomX, FlappyCombat.game.world.randomY, FlappyCombat.foodGroup)
    FlappyCombat.game.physics.arcade.overlap(
        FlappyCombat.birdGroup,
        FlappyCombat.foodGroup,
        onFoodMeetBird,
        null,
        this
    );

    if (FlappyCombat.inputController) FlappyCombat.inputController.update();
}


var onFoodMeetBird = function(birdSprite, foodSprite) {

    birdSprite.score += foodSprite.score;
    console.log(birdSprite.score);
    foodSprite.kill();
}
