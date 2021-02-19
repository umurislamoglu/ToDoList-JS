//TÜM ELEMENTLERİ SEÇME

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventlisteners();

function eventlisteners(){  //tüm event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUi);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos)
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){

    if(confirm("Tüm todoları silmek istedğinize emin misiniz ?")) {
    //Todoları Arayüzden Temizleme
    
        // todoList.innerHTML= ""; // Yavaş bir yöntem

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        } //daha hızlı bir yöntem
        localStorage.removeItem("todos"); // localstoragedan key silinince tüm itemler silindi.
    }
};

function filterTodos(e) {
    const filterValue  = e.target.value.toLowerCase();
    const listItems  = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text =listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1) {
            //Bulamazsa
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    })
}


function deleteTodo(e){
    console.log(e.target);

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Todo başarıyla silindi...")
    }

}
function deleteTodoFromStorage(deletetodo){

let todos = getTodosFromStorage();

todos.forEach(function(todo,index){
    if(todo === deletetodo){
    todos.splice(index,1); // arrayden değeri silme
    }
});
localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUi(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUi(todo);
    })
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger","Lütfen bir todo giriniz...");
    
    }
    else{
    addTodoToUi(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","Todo başarıyla eklendi...")
    }
    e.preventDefault();
}

function getTodosFromStorage() { //Storagedan bütün todoları alır.
    let todos;
    if(localStorage.getItem("todos") === null) {

        todos=[];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {

    let todos =getTodosFromStorage();
    
    todos.push(newTodo);
    
    localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type, message){
    //    <div class="alert alert-danger" role="alert">
    //     A simple danger alert—check it out!
    //     </div>

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    //settimeout metodu

    setTimeout(() => {
        alert.remove();
    }, 1000);
}


function addTodoToUi(newTodo){ //string değerini list item olarak ekleme
     /* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */

//List item oluşturma
const listItem = document.createElement("li");
const link = document.createElement("a");
link.href = "#"
link.className =  "delete-item";
link.innerHTML =  "<i class = 'fa fa-remove'></i>"
listItem.className= "list-group-item d-flex justify-content-between"

//Tect Node Ekleme

listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

//TodoListe  list itemi ekleme

todoList.appendChild(listItem);


//Ekledikten sonra inputun içini boşaltma
todoInput.value = "";
}