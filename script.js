const difficultySelect = document.getElementById("difficulty");
const colorSelect = document.getElementById("color");
const startBtn = document.getElementById("startBtn");
const pixel = document.getElementById("pixel");
const gameArea = document.getElementById("gameArea");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const bestText = document.getElementById("best");
const messageText = document.getElementById("message");

let score = 0;
let timeLeft = 60;
let timerInterval = null;
let gameStarted = false;
let bestScore = Number(localStorage.getItem("bestScore")) || 0;

if (bestText) {
    bestText.textContent = "Best score: " + bestScore;
}

function getSize() {
    const diff = difficultySelect.value;
    if (diff === "easy") return 50;
    if (diff === "normal") return 35;
    return 25;
}

function updateScore() {
    scoreText.textContent = "Score: " + score;
}

function updateTime() {
    timeText.textContent = "Time left: " + timeLeft;
}

function updateBest() {
    if (bestText) {
        bestText.textContent = "Best score: " + bestScore;
    }
}

function movePixel() {
    const size = getSize();
    const maxX = Math.max(gameArea.clientWidth - size, 0);
    const maxY = Math.max(gameArea.clientHeight - size, 0);

    const x = Math.floor(Math.random() * (maxX + 1));
    const y = Math.floor(Math.random() * (maxY + 1));

    pixel.style.width = size + "px";
    pixel.style.height = size + "px";
    pixel.style.left = x + "px";
    pixel.style.top = y + "px";
}

function endGame(text) {
    clearInterval(timerInterval);
    gameStarted = false;
    pixel.style.display = "none";

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }

    updateBest();

    if (messageText) {
        messageText.textContent = text + " Your score: " + score + " | Best score: " + bestScore;
    }
}

function startGame() {
    if (colorSelect.value === "") {
        if (messageText) {
            messageText.textContent = "Choose color!";
        }
        return;
    }

    clearInterval(timerInterval);

    score = 0;
    timeLeft = 60;
    gameStarted = true;

    if (messageText) {
        messageText.textContent = "";
    }

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
