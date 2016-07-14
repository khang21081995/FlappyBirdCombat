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
    FlappyCombat.game.load.image('birdLeft', './images/sprite1.png');
    FlappyCombat.game.load.image('birdRight', './images/sprite1.png');

    FlappyCombat.game.load.image('food', './images/Nintendo-Button-B.png');
    FlappyCombat.game.load.image('barrie', './images/big_explosion_5.png');
    FlappyCombat.game.load.image('background', './images/map.png') ;
}
var bird;
var create = function() {
    FlappyCombat.game.add.tileSprite(0, 0, 6000, 1000, "background");
    FlappyCombat.game.physics.startSystem(Phaser.Physics.ARCADE);
    FlappyCombat.keyboard = FlappyCombat.game.input.keyboard;
    FlappyCombat.game.physics.arcade.gravity.y = 10;
    FlappyCombat.birdGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.foodGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.game.world.setBounds(0, 0, 6000, 1000);
    bird = new Bird(500, 500, FlappyCombat.birdGroup, 1);
    FlappyCombat.inputController = new InputController(FlappyCombat.keyboard, bird);
    FlappyCombat.game.camera.follow(bird.sprite);
    for (var i = 0; i < 20; i++) {
        FlappyCombat.game.add.sprite(FlappyCombat.game.world.randomX, FlappyCombat.game.world.randomY, 'barrie');
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
