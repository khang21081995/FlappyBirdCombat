class Barrie {
    constructor(x, y, group) {
        this.sprite = group.create(x, y, 'barrie');
        FlappyCombat.game.physics.arcade.enable(this.sprite);
  
        this.sprite.body.immovable = true;
    }
}
