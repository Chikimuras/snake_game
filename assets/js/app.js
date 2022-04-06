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
const highscore_display = document.getElementById("highscore");
const highscore = localStorage.getItem("highscore");
if (highscore) {
    highscore_display.innerHTML = highscore;
} else {
    highscore_display.innerHTML = 0;
}
const loosing_box = document.getElementById("loosing_box");

const snake = new Snake(BLOCK_SIZE);
const food = new Food();
let currentDirection = "right";

const startingButtons = document.querySelectorAll(".start-button");
const main = document.getElementById("main");

const audio_setting = document.getElementById("audio");
const audio_icon = document.getElementById("audio_icon");
const audio = new Audio("assets/sounds/game_music.mp3");
const eat_sound = new Audio("assets/sounds/eat.mp3");

const dialog_box = document.getElementById("dialog_box");

audio_setting.hidden = true;
audio.loop = true;

if (localStorage.getItem("audio") == "true") {
    audio_setting.checked = true;
    audio_icon.classList.add("fa-volume-high");
    audio_icon.classList.remove("fa-volume-mute");
} else {
    audio_setting.checked = false;
    audio_icon.classList.add("fa-volume-mute");
    audio_icon.classList.remove("fa-volume-high");
}

audio_setting.addEventListener("click", () => {
    if (audio_setting.checked) {
        audio_icon.classList.add("fa-volume-high");
        audio_icon.classList.remove("fa-volume-mute");
        setDialogMessage("Audio enabled");
        localStorage.setItem("audio", "true");
    } else {
        audio_icon.classList.add("fa-volume-mute");
        audio_icon.classList.remove("fa-volume-high");
        setDialogMessage("Audio disabled");
        localStorage.setItem("audio", "false");
    }
});

function setDialogMessage(message) {
    dialog_box.classList.add("shown");
    dialog_box.innerHTML = message;
    setTimeout(() => {
        dialog_box.classList.remove("shown");
        dialog_box.innerHTML = "";
    }, 2000);
}

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
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
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
        if (localStorage.getItem("highscore") < score) {
            localStorage.setItem("highscore", score);
        }
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

function display_game(boxToHide, boxToShow) {
    boxToHide.classList.add("d-none");
    boxToShow.classList.remove("d-none");
}

startingButtons.forEach((button) => {
    button.addEventListener("click", () => {
        display_game(main, game_panel);
        difficulty = button.dataset.difficulty;
        start(button.dataset.difficulty);
        if (localStorage.getItem("audio") == "true") {
            audio.play();
        }
    });
});
