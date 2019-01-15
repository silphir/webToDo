const IMG_NUMBER = 6;

const body = document.querySelector("body");

function paintImage(imgNumber) {
    body.style.backgroundImage = `url(images/${imgNumber + 1}.jpg)`;
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