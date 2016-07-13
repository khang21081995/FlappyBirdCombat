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
    }

    update(direction) {
        if (direction.x < 0) {
            this.sprite.body.velocity.x = -250;
            this.sprite.loadTexture('birdLeft') //TODO add left image
        } else if (direction.x > 0) {
            this.sprite.body.velocity.x = 250;
            this.sprite.loadTexture('birdRight') //TODO add right image
        }

        this.sprite.body.velocity.y = direction.y * 200;
    }
}
