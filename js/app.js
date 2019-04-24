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

const enemy1 = new Enemy(-200, 62);
const enemy2 = new Enemy(-200, 144);
const enemy3 = new Enemy(-200, 226);

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

    player.update() * dt;
};

/**
 * random speed function
 */
function randomSpeed() {
    return 100 + Math.floor(Math.random() * Math.floor(350));
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-cat-girl.png';
        this.update = function () {
            for (let enemy of allEnemies) {
                let roundedX = Math.round(enemy.x);
                let roundedY = Math.round(enemy.y);
                if (roundedY === player.y) {
                    if (roundedX === player.x) {
                        resetPlayerPos();
                    }
                }
            }
        };
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
        this.handleInput = function (e) {
            // move player
            (e === 'left' && this.x >= 100) ? this.x = this.x - 101 : this.x = this.x;
            (e === 'up' && this.y >= 62) ? this.y = this.y - 82 : this.y = this.y;
            (e === 'right' && this.x <= 304) ? this.x = this.x + 101 : this.x = this.x;
            (e === 'down' && this.y <= 308) ? this.y = this.y + 82 : this.y = this.y;
        };
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player(203, 390);

/**
 * reset player position on hit
 */
function resetPlayerPos() {
    player.x = 203;
    player.y = 390;
}

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
