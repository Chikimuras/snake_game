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

const audio = new Audio("assets/sounds/game_music.mp3");
const eat_sound = new Audio("assets/sounds/eat.mp3");
audio.loop = true;
//Detect which key is pressed
function deteckKeyPressed() {
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                currentDirection = "up";
                break;
            case "ArrowDown":
                e.preventDefault();
                currentDirection = "down";
                break;
            case "ArrowLeft":
                e.preventDefault();
                currentDirection = "left";
                break;
            case "ArrowRight":
                e.preventDefault();
                currentDirection = "right";
                break;
            case "Escape":
                console.log("escape");
                break;
            default:
                break;
        }
    });
}
//Clear the screen for the next frame
function clearScreen() {
    ctx.clearRect(0, 0, APP_SIZE, APP_SIZE);
}

//Main game loop
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

//Init the game
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
    if (difficulty == "xtrem") {
        setInterval(() => {
            while (canvas.width > 100 && canvas.height > 100) {
                canvas.width -= 10;
                canvas.height -= 10;
                APP_SIZE -= 10;
            }
        }, 5000);
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
        audio.play();
    });
});
