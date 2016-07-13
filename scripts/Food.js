class Food {
    constructor(x, y, group) {
        this.sprite = group.create(x, y, 'food');
        FlappyCombat.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.score = 1;
    }
}
