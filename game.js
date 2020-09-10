let width;
let height;
let titleSize;
let canvas;
let ctx;

//game objects
function init() {

    titleSize = 20;

    width = titleSize * Math.floor(window.innerWidth / titleSize);
    height = titleSize * Math.floor(window.innerHeight / titleSize);

    canvas = document.getElementById("game-area");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
   
}