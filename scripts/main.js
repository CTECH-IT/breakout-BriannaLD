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

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;

let lives = 3;

//set up a 2-dimensional array for the bricks
let bricks = [];
for (let c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r=0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, show: true };
    }
}

function drawBall() {
//draw the ball
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "#FFFFF0";
ctx.fill();
ctx.closePath;
}

function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFE4B5";
    ctx.fill();
    ctx.closePath();
}

function drawBricks () {
    for (let c=0; c<brickColumnCount; c++){
        for (let r=0; r<brickRowCount; r++){
            if (bricks[c][r].show == true){
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#FFE4B5";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function draw() {
//clear the canvas 
ctx.clearRect(0, 0, canvas.width, canvas.height);

drawBricks();
drawBall();
drawPaddle();
collisionDetection();
drawScore();
drawLives();

//change the x and y values for the ball
x += dx;
y += dy;

//checks to see if ball is going off the page, reversing direction when it does.
if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
}

if (y + dy < ballRadius) { //ceiling check
    dy = -dy;
} else if (y + dy > canvas.height - ballRadius) { //floor check

    if (x > paddleX && x < paddleX + paddleWidth) { //paddle check
        dy = -dy;
    } else { //hit the floor
        if (lives > 1) {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
                lives--;
        }
        else {
    alert ("GAME OVER - GET GOOD");
    document.location.reload();
    clearInterval(interval); //needed for browser to end the game
        }
    }
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

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++){
            let b = bricks[c][r];
            if (b.show == true) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                dy = -dy;
                b.show = false;
                score++;
                if (score ==brickRowCount*brickColumnCount) {
                    alert ("I guess you won. Not bad.");
                    document.location.reload();
                    clearInterval(interval); //Needed for browser to end game
                }
                }
            }
        }
    }
}

function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "0095DD";
    ctx.fillText("  |   Lives: " + lives, 75, 20)
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
        if (paddleX < 0){
            paddleX = 0;
        }
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("mousemove", mouseMoveHandler, false);

let interval = setInterval(draw, 10);

