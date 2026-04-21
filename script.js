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

// рекорд з памʼяті браузера
let bestScore = localStorage.getItem("bestScore") || 0;

function getSize() {
    const diff = difficultySelect.value;

    if (diff === "easy") return 45;
    if (diff === "normal") return 30;
    return 22;
}

function updateScore() {
    scoreText.textContent = "Score: " + score;
}

function updateTime() {
    timeText.textContent = "Time left: " + timeLeft;
}

function movePixel() {
    const size = getSize();

    const maxX = gameArea.clientWidth - size;
    const maxY = gameArea.clientHeight - size;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    pixel.style.width = size + "px";
    pixel.style.height = size + "px";
    pixel.style.left = x + "px";
    pixel.style.top = y + "px";
}

function endGame(text) {
    clearInterval(timerInterval);
    gameStarted = false;
    pixel.style.display = "none";

    // оновлення рекорду
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }

    alert(
        text +
        "\nYour score: " + score +
        "\nBest score: " + bestScore
    );
}

function startGame() {
    if (colorSelect.value === "") {
        alert("Choose color!");
        return;
    }

    clearInterval(timerInterval);

    score = 0;
    timeLeft = 60;
    gameStarted = true;

    updateScore();
    updateTime();

    pixel.style.background = colorSelect.value;
    pixel.style.display = "block";

    movePixel();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTime();

        if (timeLeft <= 0) {
            endGame("Time over!");
        }
    }, 1000);
}

pixel.addEventListener("click", (e) => {
    if (!gameStarted) return;

    e.stopPropagation();

    score++;
    updateScore();
    movePixel();
});

gameArea.addEventListener("click", (e) => {
    if (!gameStarted) return;

    if (e.target !== pixel) {
        endGame("You missed!");
    }
});

startBtn.addEventListener("click", startGame);
