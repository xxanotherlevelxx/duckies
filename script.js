const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

canvas.width = 1000;
canvas.height = 600;

const player = {
    x: 100,
    y: 100,
    size: 60,
    speed: 3,
    direction: "left"
};

// const duckFrames = [
//     new Image(),
//     new Image(),
//     new Image(),
//     new Image(),
//     new Image()
// ];


// duckFrames[0].src = "./assets/duck-idle-1.png";
// duckFrames[1].src = "./assets/duck-idle-2.png";
// duckFrames[2].src = "./assets/duck-idle-3.png";
// duckFrames[3].src = "./assets/duck-idle-4.png";
// duckFrames[4].src = "./assets/duck-idle-5.png";


// 배열 처리 (es6 문법)
// const duckFrames = Array.from({length: 5}, (_, i) => {
//     const img = new Image();
//     img.src = `./assets/duck-idle-${i + 1}.png`;
//     return img;
// });

const idleFrames = [];
// https://phaser.io
// 반복문
for (let i = 1; i <= 5; i++) {
    const img = new Image();
    img.src = `./assets/duck-idle-${i}.png`;
    idleFrames.push(img);
}

const walkFrames = [];

for (let i = 0; i <= 4; i++) {
    const img = new Image();
    img.src = `./assets/duck-walk-${i}.png`;
    walkFrames.push(img);
}

let currentFrame = 0;
let frameTimer = 0;
let currentAnimation = idleFrames;

ctx.drawImage(currentAnimation[currentFrame], player.x, player.y, player.size, player.size);

const keys = {
    right: false,
    left: false,
    up: false,
    down: false
};

const keyMap = {
    "ArrowRight": "right",
    "ArrowLeft": "left",
    "ArrowUp": "up",
    "ArrowDown": "down"
};

function update() {
    if (keys.right && player.x < canvas.width - player.size) {
        player.x += player.speed;
        player.direction = "left";
    }
    if (keys.left && player.x > 0) {
        player.x -= player.speed;
        player.direction = "right";
    }
    if (keys.up && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.down && player.y < canvas.height - player.size) {
        player.y += player.speed;
    }

    let isMoving = keys.right || keys.left || keys.up || keys.down;

    if (isMoving) {currentAnimation = walkFrames;} else {currentAnimation = idleFrames;}
    
    frameTimer++;

    if (frameTimer >= 10) {
        frameTimer = 0;
        currentFrame++;

        if (currentFrame >= currentAnimation.length) {
            currentFrame = 0;
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    if (player.direction === "left") {
        ctx.scale(-1, 1);

        ctx.drawImage(
            currentAnimation[currentFrame],
            -player.x - player.size,
            player.y,
            player.size,
            player.size
        );

    } else {

        ctx.drawImage(
            currentAnimation[currentFrame],
            player.x,
            player.y,
            player.size,
            player.size
        );

    }

    ctx.restore();
}

function draw() {
    update();
    render();

    requestAnimationFrame(draw);
}

draw();

document.addEventListener("keydown", function (event) {
    event.preventDefault();

    const key = keyMap[event.key];
    if (key) {
        keys[key] = true;
    }
});

document.addEventListener("keyup", function (event) {
    const key = keyMap[event.key];
    if (key) {
        keys[key] = false;
    }
});
