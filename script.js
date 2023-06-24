//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");
// //password
// const passwordInput = document.getElementById("password-input");
// const passwordSubmit = document.getElementById("password-submit");
// const passwordError = document.getElementById("password-error");
// // Pre-set password
// const password = "raiha28062001";


//Event Listeners 

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//Password functionality
// // Add event listener to submit button
// passwordSubmit.addEventListener("click", function () {
//   if (passwordInput.value === password) {
//     // Display Todo list
//     document.getElementById("todo-container").style.display = "flex";
//     // Hide password container
//     document.getElementById("password-container").style.display = "none";
//   } else {
//     // Display error message
//     passwordError.style.display = "block";
//   }
// });


//Functions

function addTodo(event) 
{
    //prevent form form submitting 
    event.preventDefault();
    //creating the todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create Li inside of the todo div
    const newTodo = document.createElement("li");
    //the text we write is printed by using the next line 24 
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add todo to local storage 
    saveLocalTodos(todoInput.value);
    //Checkmark button inside of the todo div
    const completedButton = document.createElement("button");
    completedButton.innerHTML='<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button inside of the todo div
    const trashButton = document.createElement("button");
    trashButton.innerHTML='<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append the todoDiv we created to the todo-list 
    todoList.appendChild(todoDiv);
    //clear todo input value 
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete the check
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //checkmark 
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed"); 
    }
    

}

function filterTodo(e) {
    const todos = document.querySelectorAll(".todo");
    todos.forEach(function(todo){
        if(todo.nodeType === 1){ 
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed" :
                    if(todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                break;
                case "uncompleted":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else {
                        todo.style.display = "none";
                    }
                break;
                default: 
                  todo.style.display = "none";
            }
        }
    });
}

function saveLocalTodos(todo) {
    //check -- do i already have todo tasks ?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //creating the todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create Li inside of the todo div
    const newTodo = document.createElement("li");
    //the text we write is printed by using the next line 24 
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
  
    //Checkmark button inside of the todo div
    const completedButton = document.createElement("button");
    completedButton.innerHTML='<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button inside of the todo div
    const trashButton = document.createElement("button");
    trashButton.innerHTML='<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append the todoDiv we created to the todo-list 
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todo.innerText,1));
    localStorage.setItem('todos',JSON.stringify(todos));
}





