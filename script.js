const body = document.querySelector('body');
const toggle = document.getElementById("moon");
const input = document.querySelector('.input');
const addBtn = document.querySelector('.add-btn');
const ulDiv = document.querySelector('.todo-list');
const allTodosCount = document.querySelector('.all-todos');
const itemsLeft = document.querySelector('.items-left');


// EventListeners
toggle.addEventListener('click', function(){
    this.classList.toggle('fa-sun');
    if(this.classList.toggle('fa-moon')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
    }else{
        body.style.background = '#7f8c8d';
        body.style.color = 'white';
        body.style.transition = '2s';
    }
});

addBtn.addEventListener('click', () => {
    createTodo(input);
});


document.addEventListener('DOMContentLoaded', getLocalTodo);


// Functions
const createTodo = (input) => {
    const liDiv = document.createElement('li');
    liDiv.classList = 'lists';
    const check = document.createElement('div');
    check.classList = 'check';
    check.innerHTML = '<i class="fa-solid fa-check"></i>';
    liDiv.appendChild(check);
    const text = document.createElement('div');
    text.classList = 'text';
    text.innerText = input.value;
    liDiv.appendChild(text);

    // Saving todos in local storage
    savelocalTodos(input.value);

    const remove = document.createElement('div');
    remove.classList = 'remove';
    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    liDiv.appendChild(remove);
    ulDiv.appendChild(liDiv);

    input.value = "";

    remove.addEventListener('click', () => {
        removeTodo(liDiv);
        countTodo();
    });

    check.addEventListener('click', () => {
        checkMark(text, liDiv);
        countTodo();
    });

    const clearAllTodos = document.querySelector('.clear-all');
    clearAllTodos.addEventListener('click', () => {
        deleteAllTodos();
        clearAllLocalTodos(liDiv);
        countTodo();
    });

    countTodo();
}

const removeTodo = (liDiv, todo) => {
    liDiv.remove();
    removeLocalTodo(todo, liDiv);
}

const checkMark = (text, liDiv) => {
    text.classList.toggle('textt');
    liDiv.classList.toggle('completed');
}

const deleteAllTodos = () => {
    const liDiv = document.querySelectorAll('.lists');
    for (let li of liDiv){
        li.remove();
    }
}

const countTodo = () => {
    const liDiv = document.querySelectorAll('.lists').length;
    allTodosCount.innerText = `You Have ${liDiv} Todo`;

    const comLi = document.getElementsByClassName('lists completed').length;
    const todosLeft = liDiv - comLi;
    itemsLeft.innerText = `${todosLeft} Todo Left`;
}

const savelocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodo() {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const liDiv = document.createElement('li');
        liDiv.classList = 'lists';
        const check = document.createElement('div');
        check.classList = 'check';
        check.innerHTML = '<i class="fa-solid fa-check"></i>';
        liDiv.appendChild(check);
        const text = document.createElement('div');
        text.classList = 'text';
        text.innerText = todo;
        liDiv.appendChild(text);
        const remove = document.createElement('div');
        remove.classList = 'remove';
        remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
        liDiv.appendChild(remove);
        ulDiv.appendChild(liDiv);    

        remove.addEventListener('click', () => {
            removeTodo(liDiv);
        });
       
        const clearAllTodos = document.querySelector('.clear-all');
        clearAllTodos.addEventListener('click', () => {
            deleteAllTodos();
            countTodo();
        });

        check.addEventListener('click', () => {
            checkMark(text, liDiv);
            countTodo();
        });

        countTodo();
    });
}

const removeLocalTodo = (todo, liDiv) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const liTxt = liDiv.children[1].innerText;
    todos.splice(todos.indexOf(liTxt), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    countTodo();
}

const clearAllLocalTodos = (liDiv) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const liTxt = liDiv.children[1].innerText;
    todos.splice(todos.indexOf(liTxt), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}