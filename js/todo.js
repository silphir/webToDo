const LS_TODOS = "toDos";
const LS_MAXSEQ_TODO = "seq";

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

let toDos = [];
let maxSeq = 0;

function finCheck(event){
    const toDoText = event.target.parentNode.querySelector("span");
    if(toDoText.classList.contains("finToDo")){
        toDoText.classList.remove("finToDo");
    }
    else {
        toDoText.classList.add("finToDo");
    }

    toDos.forEach(function(toDo) {
        if(toDo.id === parseInt(event.target.parentNode.id)) toDo.check = event.target.checked;
    });

    saveToDos();
}

function deleteToDo(event) {
    const delBtn = event.target;
    const li = delBtn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;

    saveToDos();
}

function saveToDos() {
    localStorage.setItem(LS_TODOS, JSON.stringify(toDos));
    localStorage.setItem(LS_MAXSEQ_TODO, maxSeq);
}

function addToDo(id, text, check) {
    const ol = document.createElement("ol");
    const span = document.createElement("span");
    const spanDelBtn = document.createElement("span");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    checkBox.addEventListener("click", finCheck);
    spanDelBtn.classList.add("delButton");
    spanDelBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    ol.id = id;
    checkBox.checked = check;
    if (check === true) {
        span.classList.add("finToDo");
    }

    ol.appendChild(checkBox);
    ol.appendChild(span);
    ol.appendChild(spanDelBtn);

    toDoList.appendChild(ol);
    
    const toDoObj = {
        id: id,
        text: text,
        check: checkBox.checked
    };
    toDos.push(toDoObj);

    maxSeq = id;
}

function handleToDoSubmit(event) {
    event.preventDefault();
    
    const currentValue = toDoInput.value;
    
    addToDo(maxSeq + 1, currentValue, false);
    saveToDos();
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(LS_TODOS);
    maxSeq = JSON.parse(localStorage.getItem(LS_MAXSEQ_TODO)) || 0;
    
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            addToDo(toDo.id, toDo.text, toDo.check);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();