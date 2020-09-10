let width;
let height;
let tileSize;
let canvas;
let ctx;
let food;
let snake;
let fps;
let score;
let isPaused;

//game objects initialization
function init() {

    tileSize = 20;

    width = tileSize * Math.floor(window.innerWidth / tileSize);
    height = tileSize * Math.floor(window.innerHeight / tileSize);

    canvas = document.getElementById("game-area");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    food = new Food(spawnLocation(), "red");

    snake = new Snake({ x: tileSize * Math.floor(width / (2 * tileSize)), y: tileSize * Math.floor(height / (2 * tileSize)) }, "#39ff14")
    
    fps = 10;

    score = 0;
    isPaused = false;
}

class Food {

    constructor(pos, color) {
        
        this.x = pos.x;
        this.y = pos.y;
        this.color = color;

    }

    draw() {

        ctx.beginPath();
        ctx.rect(this.x, this.y, tileSize, tileSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

    }
}

function spawnLocation() {

    let rows = width / tileSize;
    let cols = height / tileSize;

    let xPos, yPos;

    xPos = Math.floor(Math.random() * rows) * tileSize;
    yPos = Math.floor(Math.random() * cols) * tileSize;

    return { x: xPos, y: yPos };
}

class Snake {

    constructor(pos, color) {

        this.x = pos.x;
        this.y = pos.y;
        this.tail = [{ x: pos.x - tileSize, y: pos.y }, { x: pos.x - tileSize * 2, y: pos.y }];
        this.velX = 1;
        this.velY = 0;
        this.color = color;

    }

    draw() {

        //the head
        ctx.beginPath();
        ctx.rect(this.x, this.y, tileSize, tileSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

        //the tail
        for (var i = 0; i < this.tail.length; i++) {

            tx.beginPath();
            ctx.rect(this.tail[i].x, this.tail[i].y, tileSize, tileSize);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();

        }
    }

    move() {

        //movement of tail
        for (var i = this.tail.length - 1; i > 0; i--) {
            
            this.tail[i] = this.tail[i - 1];

        }

        //update start of tail to acquire position of the head
        if (this.tail.length != 0)
            this.tail[0] = { x: this.x, y: this.y };

        //movement of head
        this.x += this.velX * tileSize;
        this.y += this.velY * tileSize;

    }

    //change the direction of movement of snake
    dir(dirX, dirY) {

        this.velX = dirX;
        this.velY = dirY;

    }

    //determines whether snake has eaten food
    eat() {
        
        if (Math.abs(this.x - food.x) < tileSize && Math.abs(this.y - food.y) < tileSize) {

            //add to tail
            this.tail.push({});
            return true;
        }

        return false;

    }

    //check for snake death
    die() {

        for (var i = 0; i < this.tail.length; i++) {

            if (Math.abs(this.x - this.tail[i].x) < tileSize && Math.abs(this.y - this.tail[i].y < tileSize)) {
                return true;
            }
        }
        return false;
    }

    //sends snake to other side of the border if crossed
    border() {

        if (this.x + tileSize > width && this.velX != -1 || this.x < 0 && this.velX != 1)
            this.x = width - this.x;

        else if (this.y + tileSize > height && this.velY != -1 || this.velY != 1 && this.y < 0)
            this.y = height - this.y;

    }

}

//starts the game
function game() {

    init();

    interval = setInterval(update, 1000/fps);

}

//the "game loop"
function update () {

    if (isPaused){
        return;
    }

    if (snake.die()) {
        alert("GAME OVER");
        clearInterval(interval);
        window.location.reload();
    }

    snake.border();

    if (snake.eat()) {
        food = new Food(spawnLocation(), "red")
        score += 10;
    }

    //clearing canvas for redrawing
    ctx.clearRect(0, 0, width, height);

    food.draw();
    snake.draw();
    snake.move();
    showScore();
}

function showScore() {

    ctx.textAlign = "center";
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE: " + score, width - 120, 30);

}

function showPaused() {

    ctx.textAlign = "center";
    ctx.font = "35px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("PAUSED", width / 2, height / 2);
}

