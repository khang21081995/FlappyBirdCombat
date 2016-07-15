class Bird {
    constructor(x, y, group, id) {
        this.sprite = group.create(x, y, 'birdRightlv1');
        FlappyCombat.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.direction = new Phaser.Point(1, 1);
        this.sprite.body.gravity.y = 100;
        //this.lastShotTime = FlappyCombat.game.time.now;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.health = 1;
        this.sprite.score = 0;
        this.sprite.level = 1;
        this.sprite.body.velocity.x = 0;
        this.sprite.id = id;

    }

    update(direction) {
        var birdLeft, birdRight, velocity;
        // if(this.sprite.body.gravity.y != 100)
        // this.sprite.body.gravity.y = 100;
        if (this.sprite.level == 1) {
            birdLeft = 'birdLeftlv1';
            birdRight = 'birdRightlv1';
            velocity = 250;
        } else
        if (this.sprite.level == 2) {
            birdLeft = 'birdLeftlv2';
            birdRight = 'birdRightlv2';
            velocity = 150;
        } else{
            birdLeft = 'birdLeftlv3';
            birdRight = 'birdRightlv3';
            velocity = 100;
         }
        // else
        // if (this.sprite.level == 4) {
        //     birdLeft = 'birdLeftlv4';
        //     birdRight = 'birdRightlv4';
        //     velocity = 100;
        // } else {
        //     birdLeft = 'birdLeftlv5';
        //     birdRight = 'birdRightlv5';
        //     velocity = 50;
        // }

        if (direction.x < 0) {
            this.sprite.body.velocity.x = -velocity;
            this.sprite.loadTexture(birdLeft);
        } else if (direction.x > 0) {
            this.sprite.body.velocity.x = velocity;
            this.sprite.loadTexture(birdRight);
        }

        this.sprite.body.velocity.y = direction.y * 150;
    }
}
