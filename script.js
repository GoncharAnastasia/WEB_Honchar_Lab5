const difficultySelect = document.getElementById("difficulty");
const colorSelect = document.getElementById("color");
const startBtn = document.getElementById("startBtn");
const pixel = document.getElementById("pixel");
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

let score = 0;
let timeLeft = 60;
let gameInterval = null;
let timerInterval = null;
let gameStarted = false;

function getPixelSize() {
    const difficulty = difficultySelect.value;

    if (difficulty === "easy") return 40;
    if (difficulty === "normal") return 25;
    return 15;
}

function getPixelSpeed() {
    const difficulty = difficultySelect.value;

    if (difficulty === "easy") return 1200;
    if (difficulty === "normal") return 800;
    return 500;
}

function movePixel() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const size = getPixelSize();

    const maxX = areaWidth - size;
    const maxY = areaHeight - size;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    pixel.style.width = size + "px";
    pixel.style.height = size + "px";
    pixel.style.left = randomX + "px";
    pixel.style.top = randomY + "px";
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    pixel.style.display = "none";
    gameStarted = false;
    alert("Game over! Your score: " + score);
}

function startGame() {
    const selectedColor = colorSelect.value;

    if (selectedColor === "") {
        alert("Please choose a color.");
        return;
    }

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    score = 0;
    timeLeft = 60;
    gameStarted = true;

    scoreText.textContent = "Score: " + score;
    timeText.textContent = "Time left: " + timeLeft;

    pixel.style.backgroundColor = selectedColor;
    pixel.style.display = "block";

    movePixel();

    gameInterval = setInterval(() => {
        movePixel();
    }, getPixelSpeed());

    timerInterval = setInterval(() => {
        timeLeft--;
        timeText.textContent = "Time left: " + timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

pixel.addEventListener("click", function () {
    if (!gameStarted) return;

    score++;
    scoreText.textContent = "Score: " + score;
    movePixel();
});

startBtn.addEventListener("click", startGame);
