//selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list"); // todolist was selected insteasd of todo-container
const filterOption = document.querySelector(".filter-todos");

//event listener
todoButton.addEventListener('click', handleAddTodo);
todoList.addEventListener('click' , checkRemove);
filterOption.addEventListener('click' , filterTodos);
document.addEventListener('DOMContentLoaded' , getLocalTodos);


//function
function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement("ul"); // add li to div without ul or ol mohandes ???
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todoInput.value}</li>
    <span><i class="fa-regular fa-circle-check"></i></span>
    <span><i class="fa-regular fa-trash-can"></i></span> 
    `;
    todoDiv.innerHtml = newTodo;
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function handleAddTodo(e) {
    e.preventDefault();
    let newTodoItem = document.createElement('li');
    newTodoItem.classList.add('todo');
    newTodoItem.innerHTML = `
    ${todoInput.value}
    <span><i class="fa-regular fa-circle-check"></i></span>
    <span><i class="fa-regular fa-trash-can"></i></span> 
    `;
    
    todoList.appendChild(newTodoItem);
    saveLocalTodos(todoInput.value);
    todoInput.value = '';
}


function checkRemove(e){
    const classList = [...e.target.classList];
    const item = e.target;
    console.log(item.parentElement.parentElment);
    if(classList[1] === "fa-circle-check"){
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    }
    else if(classList[1] === "fa-trash-can"){
        const todo = item.parentElement.parentElement;
        removeLocailTodos(todo);
        todo.remove();
    }
}

function filterTodos(e){
    console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach((todo)=>{
        switch(e.target.value){
            case "all" :
                todo.style.display = "flex";
                break;
            case "completed" :
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
                case "uncompleted" :
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [];
    savedTodos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(savedTodos));
}


function getLocalTodos(){
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [];
    savedTodos.forEach((todo) => {
    const todoDiv = document.createElement("ul"); // add li to div without ul or ol mohandes ???
    todoDiv.classList.add("todo");
    const newTodo = `
    <li>${todo}</li>
    <span><i class="fa-regular fa-circle-check"></i></span>
    <span><i class="fa-regular fa-trash-can"></i></span> 
    `;
    todoDiv.innerHtml = newTodo;
    todoList.appendChild(todoDiv);
    })
}

function removeLocailTodos(todo){
    let savedTodos = localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [];
    const filteredTodos = savedTodos.filter((t) => t !== todo.children[0].innerText);
    localStorage.setItem("todos" , JSON.stringify(filteredTodos));

}



