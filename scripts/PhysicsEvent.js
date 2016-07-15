/*
 * PHYSICS EVENTS
 */

var onFoodMeetBird = function(birdSprite, foodSprite) {
    birdSprite.score += foodSprite.score;
    foodSprite.kill();
    numberOfFood--;
    foodSprite.destroy();
}

var onBirdMeetBird = function(birdSprite1, birdSprite2) {
    if (birdSprite1.level < birdSprite2.level) {
        birdSprite1.kill();
        birdSprite2.score += birdSprite1.score / 2;
        FlappyCombat.client.reportDied(birdSprite1.id);
        FlappyCombat.client.reportScoreUp(birdSprite2.id, birdSprite2.score);
    } else if (birdSprite2.level < birdSprite1.level) {
        birdSprite2.kill();
        birdSprite1.score += birdSprite2.score / 2;

        FlappyCombat.client.reportDied(birdSprite2.id);
        FlappyCombat.client.reportScoreUp(birdSprite1.id, birdSprite1.score);

    } else if (birdSprite2.level == birdSprite1.level && birdSprite1.level == 3) {
        if (birdSprite2.score > birdSprite1.score) {
            birdSprite1.kill();
            birdSprite2.score += birdSprite1.score / 2;
            FlappyCombat.client.reportDied(birdSprite1.id);
            FlappyCombat.client.reportScoreUp(birdSprite2.id, birdSprite2.score);

        } else if (birdSprite2.score < birdSprite1.score) {
            birdSprite2.kill();
            birdSprite1.score += birdSprite2.score / 2;
            FlappyCombat.client.reportDied(birdSprite2.id);
            FlappyCombat.client.reportScoreUp(birdSprite1.id, birdSprite1.score);
        } else {
            return;
        }
    } else {
        return;
    }

}


var onBarieMeetBird = function(birdSprite, barrieSprite) {
    birdSprite.kill();
    FlappyCombat.client.reportDied(birdSprite.id);
}

var onBarieMeetFood = function(foodSprite, barrieSprite) {
    foodSprite.kill();
    numberOfFood--;
}
