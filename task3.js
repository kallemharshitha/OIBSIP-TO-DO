//Model
let todos;
//to check if there is a saved data if there use it 
//else  use the default value
// to convert string to array

let saved = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(saved)) {
    todos = saved;
} else {
    todos = [{
        title: 'shopping',
        dueDate: '2022-12-01',
        id: 'id1'
    },
    {
        title: 'visit',
        dueDate: '2022-12-06',
        id: 'id2'
    },
    {
        title: 'make dinner',
        dueDate: '2022-12-15',
        id: 'id3'
    }]
}
//create todo 

function createTodo(title, date) {
    let id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: date,
        id: id
    });
    save();
}
//delete Todo 
function removeTodo(deleteID) {
    todos = todos.filter(function (todo) {
        if (todo.id === deleteID) {
            return false;
        }
        else {
            return true;
        }
    })
    save();
}
function save() {
    // to convert array to string
    localStorage.setItem('todos', JSON.stringify(todos));
}

//controller
function addTodo() {
    let textbox = document.getElementById('input-todo');
    let title = textbox.value;
    let dueDate = document.getElementById('due-date');
    let date = dueDate.value;

    createTodo(title, date);
    render();
}

function deleteTodo(event) {
    console.log(event.target);
    const deleteButton = event.target;
    const deleteID = deleteButton.id;

    removeTodo(deleteID)
    render();
}

//view 
function render() {
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function (todos) {
        let element = document.createElement('div');


        element.innerText = todos.title + '___' + todos.dueDate;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.style = 'margin-left: 13px';
        deleteButton.onclick = deleteTodo;
        deleteButton.id = todos.id;
        element.appendChild(deleteButton);

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.style = 'margin-right: 20px';
        element.appendChild(checkBox);


        let todoList = document.getElementById('todo-list');
        todoList.appendChild(element);
    })
}

render();