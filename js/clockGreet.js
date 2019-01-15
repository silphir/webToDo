const LS_USER = "currentUser";

const greetForm = document.querySelector(".js-greetForm");
const input = greetForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const nameFieldH1 = document.querySelector(".js-name");
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");


function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    
    const localUser = localStorage.getItem(LS_USER);

    if (seconds%2 === 1) clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    else clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} ${minutes < 10 ? `0${minutes}` : minutes}`;

    if (date.getHours() < 6) {
        greeting.innerText = `Good night~`;
    }
    else if (6 <= date.getHours() && date.getHours() < 12) {
        greeting.innerText = `Good morning!`;
    }
    else if (12 <= date.getHours() && date.getHours() < 18) {
        greeting.innerText = `Good afternoon!`;
    }
    else if (18 <= date.getHours()) {
        greeting.innerText = `Good evening!`;
    }
}


function saveName(text) {
    localStorage.setItem(LS_USER, text);
}

function handleGreetSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    paintName(currentValue);
    saveName(currentValue);
    input.value = "";
}

function askForName() {
    greetForm.classList.remove("hide");
    nameFieldH1.classList.add("hide");
    greetForm.addEventListener("submit", handleGreetSubmit);
}

function deleteName(event) {
    localStorage.removeItem(LS_USER);
    nameFieldH1.innerText = "";
    loadName();
}

function paintName(text) {
    nameFieldH1.classList.remove("hide");

    const spanDelBtn = document.createElement("span");

    nameFieldH1.innerText = text;
    spanDelBtn.classList.add("delButton");
    spanDelBtn.addEventListener("click", deleteName);

    nameFieldH1.appendChild(spanDelBtn);
}

function paintGreeting(text) {
    greetForm.classList.add("hide");
    
    const date = new Date();
    if (date.getHours() < 6) {
        greeting.innerText = `Good night~`;
    }
    else if (6 <= date.getHours() && date.getHours() < 12) {
        greeting.innerText = `Good morning!`;
    }
    else if (12 <= date.getHours() && date.getHours() < 18) {
        greeting.innerText = `Good afternoon!`;
    }
    else if (18 <= date.getHours()) {
        greeting.innerText = `Good evening!`;
    }
}

function loadName() {
    const currentUser = localStorage.getItem(LS_USER);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
        paintName(currentUser);
    }
}

function init() {
    loadName();
    getTime();
    setInterval(getTime, 1000);
}

init();