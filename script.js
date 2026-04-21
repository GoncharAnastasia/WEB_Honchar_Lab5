let count = 0;

const btn = document.getElementById("btn");
const span = document.getElementById("count");

btn.addEventListener("click", function () {
    count++;
    span.textContent = count;
});
