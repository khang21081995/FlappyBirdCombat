class Food {
    constructor(x, y, group, typeOfFood) {

        if (typeOfFood == 1) {
            this.sprite = group.create(x, y, 'food');
            this.sprite.score = 1;
        } else {
            this.sprite = group.create(x, y, 'food2');
            this.sprite.score = 5;
        }
        FlappyCombat.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.typeOfFood = typeOfFood;

    }
}
