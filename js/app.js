// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = randomSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // reset bug to beginning of board with new speed
    if (this.x > 505) {
        this.x = -200;
        this.speed = randomSpeed();
    }

    // enemy and player collision check
    player.update();
};

/**
 * random speed function
 */
function randomSpeed() {
    return 100 + Math.floor(Math.random() * Math.floor(450));
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * player class
 */
class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.update = () => {
            for (let enemy of allEnemies) {
                if (enemy.y === player.y) {
                    if (enemy.x + 50 > player.x && enemy.x < player.x + 50) {
                        this.reset();
                    }
                }
            }
            if (player.y === -20) {
                this.success();
            }
        };
        this.render = () => {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
        this.handleInput = (e) => {
            // move player
            (e === 'left' && this.x >= 100) ? this.x -= 101 : this.x;
            (e === 'up' && this.y >= 62) ? this.y -= 82 : this.y;
            (e === 'right' && this.x <= 304) ? this.x += 101 : this.x;
            (e === 'down' && this.y <= 308) ? this.y += 82 : this.y;
        };
        this.reset = function resetPlayerPos() {
            player.x = 202;
            player.y = 390;
        }
        this.success = () => {
            setTimeout(() => {
                this.reset();
            }, 500);
        };
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = (() => {
    const enemy1 = new Enemy(-200, 62);
    const enemy2 = new Enemy(-200, 144);
    const enemy3 = new Enemy(-200, 226);
    const enemy4 = new Enemy(-200, 62);
    const enemy5 = new Enemy(-200, 144);
    const enemy6 = new Enemy(-200, 226);

    return [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

})();

// instantiate player
const player = (() => {
    return new Player(202, 390);
})();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});