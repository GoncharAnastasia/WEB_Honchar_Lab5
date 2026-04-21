const difficultySelect = document.getElementById("difficulty");
const colorSelect = document.getElementById("color");
const startBtn = document.getElementById("startBtn");
const pixel = document.getElementById("pixel");
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

let score = 0;
let timeLeft = 60;
let timerInterval = null;
let gameStarted = false;

function getSettings() {
    const difficulty = difficultySelect.value;

    if (difficulty === "easy") {
        return { size: 45 };
    }

    if (difficulty === "normal") {
        return { size: 30 };
    }

    return { size: 22 };
}

function updateScore() {
    scoreText.textContent = "Score: " + score;
}

function updateTime() {
    timeText.textContent = "Time left: " + timeLeft;
}

function movePixel() {
    const { size } = getSettings();

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const maxX = Math.max(areaWidth - size, 0);
    const maxY = Math.max(areaHeight - size, 0);

    const randomX = Math.floor(Math.random() * (maxX + 1));
    const randomY = Math.floor(Math.random() * (maxY + 1));

    pixel.style.width = size + "px";
    pixel.style.height = size + "px";
    pixel.style.left = randomX + "px";
    pixel.style.top = randomY + "px";
}

function endGame(message) {
    clearInterval(timerInterval);
    gameStarted = false;
    pixel.style.display = "none";
    alert(message);
}

function startGame() {
    const selectedColor = colorSelect.value;

    if (selectedColor === "") {
        alert("Please choose a color.");
        return;
    }

    clearInterval(timerInterval);

    score = 0;
    timeLeft = 60;
    gameStarted = true;

    updateScore();
    updateTime();

    pixel.style.backgroundColor = selectedColor;
    pixel.style.display = "block";

    movePixel();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTime();

        if (timeLeft <= 0) {
            endGame("Time is over! Your score: " + score);
        }
    }, 1000);
}

pixel.addEventListener("click", function (event) {
    if (!gameStarted) return;

    event.stopPropagation();
    score++;
    updateScore();
    movePixel();
});

gameArea.addEventListener("click", function (event) {
    if (!gameStarted) return;

    if (event.target !== pixel) {
        endGame("Game over! You missed the square.");
    }
});

startBtn.addEventListener("click", startGame);
