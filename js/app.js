// ENEMIES SECTION:
//Enemies our player must avoid
//This is the Enemy function THE PROTOTYPE that will apply to all the enemies objects derived/inherited from this prototype.
var Enemy = function(x,y,speed = 100) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x * -101; // x coordinates defines the Enemy horizontal position
    this.y = y * 83; // y coordinates defines the Enemy vertical position
    this.speed = speed; // defines the speed of the Enemy
    this.width = 20; // defines the width of the Enemy, despite the sprite this will play a role in the collision detection
    this.height = 20;//defines the height of the Enemy, idem
    this.reset = function (){
        this.x = -101
        }// this method defines the "default/start" position of the Enemy,ie on the left of the canvas
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // We multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // This function will only affect the x position of the enemy since they only move horizontally
    this.x = this.x + this.speed * dt;

    if (this.x > 505) {
            this.reset();
    }
    this.collision();
};

// Draw the enemy on the screen, required method for game. Honestly, I do not understand this only that it will render the images along with their updated position
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

    //Collision detection, this loop will go through through all the allEnemies array objects, (count "i" starts to 0;
    // stops below 4 (there are 4 objects in allEnemies array)); increase by 1 each time it loops over)
Enemy.prototype.collision = function() {
    var enemy = this;

    // The most logical way is to check whether their X and Y position intersect between enemies and player
    if (player.x < enemy.x + enemy.width  && player.x + player.width  > enemy.x &&
        player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
        // each time there is a collision, player starts from the initial point
        player.reset();
    }
};


// PLAYER SECTION:
// Player which moves through the canvas and wins if make it though the enemies 

var Player =  function(sprite,x,y) {
    this.sprite ='images/char-boy.png';
    this.x = 200;// x coordinates defines the Player horizontal position
    this.y = 400; // y coordinates defines the Playervertical position
    this.width = 20;// defines the width of the Player, despite the sprite this will play a role in the collision detection
    this.height = 20;//defines the height of the Enemy, idem
    this.reset= function (){
        this.x = 200;
        this.y = 400;
    }// this method defines the "default/start" position of the Player,ie on the center bottom of the canvas
};

//win function for the player

Player.prototype.win = function() {
     if (this.y <= -15) {
        alert("you won");
        this.reset();
    };
};
//update function for player
Player.prototype.update = function(dt) {

 
    // Player crossed the river, something happens to tell him he won
    this.win();
};   

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This function assign a movement to either the x or y position to Player each time you press on key which the value is represented by a string
// See more about the switch function here: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch
Player.prototype.handleInput = function (key) {
    debugger;
    switch (key) {
        // Move down
        case 'down':
        if(this.y < 390){// will impose the payer not to move off canvas on the bottom
            this.y = this.y + 83;
        }
        break;
        // Move up
        case 'up':
        if(this.y > 0){// will impose the payer not to move off canvas on the top
            this.y = this.y - 83;   
        }
        break;
        // Move left 
        case 'left':
        if(this.x > 35){// will impose the payer not to move off canvas on the left
            this.x = this.x - 83;
        }
        break;
        // Move right
        case 'right':
        if(this.x < 365) {// will impose the payer not to move off canvas on the right
            this.x = this.x + 83;
        }
        break;
    }
};

// The object that gets called in engine.js is "player and not Player" this is why we first needed to create it to avoid erros in the code run
var player = new Player();


// Update function for Enemy(2,2) which is faster and moves in the middle. The point is to test different way to create and object from a prototype.
 var enemyFast = new Enemy(2,2,400);    

// creation of 3 enemy objects, inherited from the Enemy() function by applying new parameters
// The object that gets called in engine is "allEnemies" this is why we first needed to creat it to avoid erros in the code run

var allEnemies = [new Enemy(1,1,170), new Enemy(2,2,150), new Enemy(3,3,300), enemyFast];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
// I do not understand exactly what happens only that it will assign the right value to my arrows key on the keyboard. 
document.addEventListener('keyup', function(e) {

    console.log(e);

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    console.log(allowedKeys);

    player.handleInput(allowedKeys[e.keyCode]);
});




//NECESSARY RESSOURCES
// 1) JavaScript basics (Udacity videos: syntax, arrays, loop, functions)
// 2) Prototype, class, objects, protoype, methods, argument, protoype, parameters, properties, instances how to call them (MDN only)
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/this
//****MUST READ**** -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
// 3) Canvas (Udacity) and other specifics to 2D games
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
