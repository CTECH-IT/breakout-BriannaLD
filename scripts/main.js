let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

function drawBall() {
//draw the ball
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath;
}

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
//clear the canvas 
ctx.clearRect(0, 0, canvas.width, canvas.height);

drawBall();
drawPaddle();

//change the x and y values for the ball
x += dx;
y += dy;

//checks to see if ball is going off the page, reversing direction when it does.
if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
}

if (y + dy < ballRadius) { //ceiling check
    dy = -dy;
} else if (y + dy > canvas.height - ballRadius) {
    alert ("GAME OVER - GET GOOD");
    document.location.reload();
    clearInterval(interval); //needed for browser to end the game
}

//paddle controls
if(rightPressed) {
    paddleX += 7
    if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
}
else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
        paddleX = 0;
    }
}

}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw, 10);

