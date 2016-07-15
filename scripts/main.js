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
    FlappyCombat.game.load.image('birdLeftlv1', './images/birdleft1.png');
    FlappyCombat.game.load.image('birdRightlv1', './images/birdright1.png');
    FlappyCombat.game.load.image('birdLeftlv2', './images/birdleft2.png');
    FlappyCombat.game.load.image('birdRightlv2', './images/birdright2.png');
    FlappyCombat.game.load.image('birdLeftlv3', './images/birdleft3.png');
    FlappyCombat.game.load.image('birdRightlv3', './images/birdright3.png');

    FlappyCombat.game.load.image('food', './images/Nintendo-Button-A1_copy.png');
    FlappyCombat.game.load.image('food2', './images/Nintendo-Button-B.png');
    FlappyCombat.game.load.image('barrie', './images/barrie1.png');
    FlappyCombat.game.load.image('background', './images/map.png');
}

var numberOfFood = 0;
var create = function() {
    FlappyCombat.client = new Client();
    FlappyCombat.game.add.tileSprite(0, 0, 6016, 1024, "background");
    FlappyCombat.game.physics.startSystem(Phaser.Physics.ARCADE);
    FlappyCombat.keyboard = FlappyCombat.game.input.keyboard;
    //FlappyCombat.game.physics.arcade.gravity.y = 10;
    FlappyCombat.birdGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.foodGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.barieGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.enemies = [];
    FlappyCombat.inputController;
    FlappyCombat.game.world.setBounds(0, 0, 6016, 1024);

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
FlappyCombat.getPlayerById = function(id, killKo) {
    for (var i = 0; i < FlappyCombat.enemies.length; i++) {
        if (FlappyCombat.enemies[i].sprite.id == id) {
            return killKo ? FlappyCombat.enemies.splice(i, 1)[0] : FlappyCombat.enemies[i]; // splicce dung de xoa phan tu thu i trong mang
        }
    }
}
