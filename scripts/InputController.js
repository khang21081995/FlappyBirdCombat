class InputController{
  constructor(keyboard, bird){
    this.keyboard = keyboard;
    this.bird = bird;
    //this.bird.sprite.velocity.x = 250;
    //this.lastJumpTime = FlappyCombat.game.time.now;
  }

  update(){
    var direction = new Phaser.Point(0,1);
    if(this.keyboard.isDown(Phaser.KeyCode.LEFT)) direction.x = -1;
    else if (this.keyboard.isDown(Phaser.KeyCode.RIGHT)) direction.x = 1;

    if (this.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
        //&& (FlappyCombat.game.time.now - this.lastJumpTime > 100)
      ){
          //this.lastJumpTime = FlappyCombat.game.time.now;
          direction.y = -1;
    }


    this.bird.update(direction);
  }
}
