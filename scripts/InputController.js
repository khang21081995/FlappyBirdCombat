class InputController {
    constructor(keyboard, bird) {
        this.keyboard = keyboard;
        this.bird = bird;
        //this.bird.sprite.velocity.x = 250;
        //this.lastJumpTime = FlappyCombat.game.time.now;
        this.lastlevel = bird.sprite.level;
        this.lastscore = bird.sprite.score;
        this.lastdirection = new Phaser.Point(0, 0);

    }

    update() {
        // var direction = this.lastdirection;
        console.log(this.bird.sprite.score);
        console.log(this.bird.sprite.level);
        this.lastdirection.y = 1;
        if (this.keyboard.isDown(Phaser.KeyCode.LEFT)) this.lastdirection.x = -1;
        else if (this.keyboard.isDown(Phaser.KeyCode.RIGHT)) this.lastdirection.x = 1;

        if (this.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
            this.lastdirection.y = -1;
        }

        this.bird.update(this.lastdirection);
        //FlappyCombat.client.reportMove(this.bird.sprite.id, this.lastdirection, this.bird.sprite.position);

        if (this.bird.sprite.score - this.lastscore > 0) {
            FlappyCombat.client.reportScoreUp(this.bird.sprite.id, this.bird.sprite.score);
            this.lastscore = this.bird.sprite.score;
        }
        if (!this.bird.sprite.alive) {
           {
                FlappyCombat.client.reportDied(this.bird.sprite.id);
            }
            console.log('reportDied');
        }
        if (this.bird.sprite.level - this.lastlevel > 0) {
            this.lastlevel = this.bird.sprite.level;
            FlappyCombat.client.reportLevelUp(this.bird.sprite.id, this.bird.sprite.level);
        }

    }
}
