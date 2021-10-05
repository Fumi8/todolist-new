//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add todo to localstorage
    saveLocalTodos(todoInput.value);

    //Check completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear Todo input value
    todoInput.value = "";
}
// appendChild()は、特定の親ノードの子ノードリストの末尾にノードを追加します。
// 親要素.appendChild(追加したい要素)という形で使われます。

    function deleteCheck(e){
        const item = e.target;
        //DELETE TODO
        if(item.classList[0] === "trash-btn"){
            const todo = item.parentElement;
            //Animation
            todo.classList.add("fall");
            todo.addEventListener("transitionend", function(){
                todo.remove();
            })
        }
//fallにstyleで落ちていきdeleteする様子をつけて、jsで実際にtransitionendを使いそれをremoveで消す

        //Check mark
        if(item.classList[0] === "complete-btn"){
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
    }
// item.parentElemenにすることで、その要素を持つ親が選択される


    function filterTodo(e) {
        const todos = todoList.childNodes;
        todos.forEach(function(todo){
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")){
                        todo.style.display = "flex";    
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
            }
        });
    }

    function saveLocalTodos(todo){
        /// check hey do I already have thing in there?
        let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function getTodos(){
        /// check hey do I already have thing in there?
        let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    todos.forEach(function(todo){
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);

        });
    }
    
    // forEach:nodelistを使うときはforEachを使う、そうすればindivisual todoにアクセスできる
    //　switch e.target.value htmelのoption:valuをターゲットにされる
    // in case all が全てだった場合は　そのままdisplay flexにする
    // case :In case その場合 case "all":~~ 全てをgrabした場合は~~
    // ifを作るときにはelseもセットで。もし何もなかった場合は..を想定する
    // !todo.classList.contains('completed')で!を使っている為にcompletedを含めないという意味になる



    // もし === nullの場合は　empty array [],それ以外、つまりある場合はJSONのlocal storageにleft
    // push? stringify?


    // deleteのところから始める！！！