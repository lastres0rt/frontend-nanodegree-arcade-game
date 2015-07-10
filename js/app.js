// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.floor(Math.random() * 3) + 1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505){
        this.x += this.y * 2;
    } else {
        this.x = -101;
        this.y = Math.floor(Math.random() * 3) + 1;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.y * 83) - 20);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 2;
    this.y = 5;
}

Player.prototype.update = function(dt) {
    // Code Goes here
    for (var i = 0; i < 3; i++){
        var e = allEnemies[i];
        var dx = Math.abs(e.x - (this.x * 101));
        if (e.y === this.y){
            if(dx <= 100){ // collision!
                    this.x = 2;
                    this.y = 5;
            }
        }
    }
    if(this.y === 0){
        this.x = 2;
        this.y = 5;
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83) - 10);
}

Player.prototype.handleInput = function(keyCode) {
    // Do something with keyCode here//
    switch (keyCode) {
        case 'right':
            if(this.x < 4) {
                this.x++;
            }
            break;
        case 'left':
            if (this.x > 0){
                this.x--;
            }
            break;
        case 'up':
            if (this.y > 0){
                this.y--;
            }
            break;
        case 'down':
            if(this.y < 5) {
                this.y++;
            }
            break;
        default:
            // do nothing;
            break;
    }
}

// Now instantiate your objects.
// because the file loaded is blank,
// I assume we need to somehow render the screen from here?


// Place all enemy objects in an array called allEnemies

allEnemies = [new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
