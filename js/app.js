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
    };
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
                if (enemy.y === this.y) {
                    if (enemy.x + 50 > this.x && enemy.x < this.x + 50) {
                        this.reset();
                    };
                };
            };
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

            // player reaches water
            if (this.y === -20) {
                success();
            };
        };
        this.reset = function resetPlayerPos() {
            this.x = 202;
            this.y = 390;
        };
    };
};

/**
 * instantiate - enemies
 */
const allEnemies = (() => {
    const enemy1 = new Enemy(-200, 62);
    const enemy2 = new Enemy(-200, 144);
    const enemy3 = new Enemy(-200, 226);
    const enemy4 = new Enemy(-200, 62);
    const enemy5 = new Enemy(-200, 144);
    const enemy6 = new Enemy(-200, 226);

    return [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
})();

/**
 * instantiate - player
 */
const player = (() => {
    return new Player(202, 390);
})();

/**
 * keyboard event
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
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

/**
 * success modal with restart button
 */
const success = () => {
    const resetBtn = document.querySelector('.restart-btn');
    const successContainer = document.querySelector('.modal-container');

    // open success container
    setTimeout(() => {
        successContainer.classList.replace('modal-closed', 'modal-open');
    }, 400);

    //restart game
    resetBtn.addEventListener('click', () => {
        player.reset();
        successContainer.classList.replace('modal-open', 'modal-closed');
    });
};