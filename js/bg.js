const IMG_NUMBER = 6;

const body = document.querySelector("body");
const div = document.createElement("div");

function paintImage(imgNumber) {
    div.style.backgroundImage = `url(images/${imgNumber + 1}.jpg)`;
    div.classList.add("bg-image");
    body.appendChild(div);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();