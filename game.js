let width;
let height;
let titleSize;
let canvas;
let ctx;
let food;

//game objects initialization
function init() {

    titleSize = 20;

    width = titleSize * Math.floor(window.innerWidth / titleSize);
    height = titleSize * Math.floor(window.innerHeight / titleSize);

    canvas = document.getElementById("game-area");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    food = new Food(spawnLocation(), "red");
   
}

class Food {

    constructor(pos, color) {
        
        this.x = pos.x;
        this.y = pos.y;
        this.color = color;

    }

    draw() {

        ctx.beginPath();
        ctx.rect(this.x, this.y, titleSize, titleSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

    }
}

function spawnLocation() {

    let rows = width / titleSize;
    let cols = height / titleSize;

    let xPos, yPos;

    xPos = Math.floor(Math.random() * rows) * titleSize;
    yPos = Math.floor(Math.random() * cols) * titleSize;

    return { x: xPos, y: yPos };
}

