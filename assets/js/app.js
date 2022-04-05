const APP_SIZE = 600;
const BLOCK_SIZE = 20;

const canvas = document.getElementById("app");
const game_panel = document.getElementById("game_panel");
const ctx = canvas.getContext("2d");

let gameSpeed = 120;
let walls;
let difficulty;
let score = 0;

const score_display = document.getElementById("score");
const loosing_box = document.getElementById("loosing_box");

const snake = new Snake(BLOCK_SIZE);
const food = new Food();
let currentDirection = "right";

const startingButtons = document.querySelectorAll(".start-button");
const main = document.getElementById("main");

function deteckKeyPressed() {
    document.addEventListener("keydown", (e) => {
        e.preventDefault();
        switch (e.key) {
            case "ArrowUp":
                currentDirection = "up";
                break;
            case "ArrowDown":
                currentDirection = "down";
                break;
            case "ArrowLeft":
                currentDirection = "left";
                break;
            case "ArrowRight":
                currentDirection = "right";
                break;
            default:
                break;
        }
    });
}

function clearScreen() {
    ctx.clearRect(0, 0, APP_SIZE, APP_SIZE);
}

function update() {
    clearScreen();
    snake.update();
    food.draw();
    if (snake.alive) {
        gameTimeout = setTimeout(update, gameSpeed);
    } else {
        console.log("perdu");
        loosing_box.classList.add("shown");
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        window.clearTimeout(gameTimeout);
    }
}

function start(difficulty) {
    switch (difficulty) {
        case "ez":
            gameSpeed = 120;
            walls = false;
            break;
        case "diff":
            gameSpeed = 80;
            walls = true;
            break;
        case "xtrem":
            gameSpeed = 60;
            walls = true;
            break;
        default:
            break;
    }
    deteckKeyPressed();
    update();
}

startingButtons.forEach((button) => {
    button.addEventListener("click", () => {
        main.classList.add("d-none");
        game_panel.classList.remove("d-none");
        difficulty = button.dataset.difficulty;
        start(button.dataset.difficulty);
    });
});
