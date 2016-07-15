/*
 * PHYSICS EVENTS
 */

var onFoodMeetBird = function(birdSprite, foodSprite) {

    birdSprite.score += foodSprite.score;

    console.log(birdSprite.score);

    if (birdSprite.score >= 50 && birdSprite.score < 100 && birdSprite.level != 2) {
        birdSprite.level = 2;
    } else if (birdSprite.score >= 100 && birdSprite.score < 300  && birdSprite.level != 3) {
        birdSprite.level = 3;
    } else if (birdSprite.score >= 300 && birdSprite.score < 550  && birdSprite.level != 4) {
        birdSprite.level = 4;
    } else if (birdSprite.score >= 550  && birdSprite.level != 5) {
        birdSprite.level = 5;
    }

    foodSprite.kill();
    numberOfFood--;
    foodSprite.destroy();
}

var onBirdMeetBird = function(birdSprite1, birdSprite2) {
    if(birdSprite1.level<birdSprite2.level){
      birdSprite1.kill();
      FlappyCombat.client.reportDied(birdSprite1.id);
      birdSprite2.score+=birdSprite1.score/2;
      FlappyCombat.client.reportScoreUp(birdSprite2.id,birdSprite2.score);
      console.log(birdSprite2.score);
    }

    birdSprite1.score += foodSprite.score;

    FlappyCombat.client.reportScoreUp(birdSprite.id,birdSprite.score);
    if (birdSprite.score >= 50 && birdSprite.score < 100) {
        birdSprite.level = 2;
    } else if (birdSprite.score >= 100 && birdSprite.score < 300) {
        birdSprite.level = 3;
    } else if (birdSprite.score >= 300 && birdSprite.score < 550) {
        birdSprite.level = 4;
    } else if (birdSprite.score >= 550) {
        birdSprite.level = 5;
    }

    foodSprite.kill();
    numberOfFood--;
    //foodSprite.destroy();
}


var onBarieMeetBird = function(birdSprite, barrieSprite) {
    birdSprite.kill();
    FlappyCombat.client.reportDied(birdSprite.id);
}

var onBarieMeetFood = function(foodSprite, barrieSprite) {
    foodSprite.kill();
    numberOfFood--;
}
