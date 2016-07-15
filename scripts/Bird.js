class Bird {
    constructor(x, y, group, id) {
        this.sprite = group.create(x, y, 'birdRight');
        FlappyCombat.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.direction = new Phaser.Point(1, 0);
        this.sprite.body.gravity.y = 100;
        //this.lastShotTime = FlappyCombat.game.time.now;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.health = 1;
        this.sprite.score = 0;
        this.sprite.level = 1;
        this.sprite.body.velocity.x = 250;
        this.sprite.id = id;
        // this.sprite.animations.add('runLeft', [3,2,1], 5, true);
        // this.sprite.animations.add('runRight', [3,2,1], 5, true);
    }

    update(direction) {
        if (direction.x < 0) {
            this.sprite.body.velocity.x = -250;
            // this.sprite.play('runLeft');
            this.sprite.loadTexture('birdLeft') //TODO add left image
        } else if (direction.x > 0) {
            this.sprite.body.velocity.x = 250;
            // this.sprite.play('runRight') //TODO add right image
            this.sprite.loadTexture('birdRight') //TODO add left image

        }
        //hien roi ma, ,b en kia anh tat cai load anh chim roi
        this.sprite.body.velocity.y = direction.y * 200;
    }
}
//ok anh hieu roi. :)
