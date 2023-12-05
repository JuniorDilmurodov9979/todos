const elForm = document.querySelector('.js-form');
const elList = document.querySelector('.js-list');
const elInput = document.querySelector('.js-input');
const elAllBtn = document.querySelector('.js-btn-all');
const elBtnPrimary = document.querySelector('.btn-primary');
const elBtnSuccess = document.querySelector('.btn-success');
const elBtnWarning = document.querySelector('.btn-warning');

const elCompletedBTn = document.querySelector('.js-btn-completed');
const elUncompletedBTn = document.querySelector('.js-btn-uncompleted');
// const elForm = document.querySelector('.js-form');
// const elForm = document.querySelector('.js-form');
const todos = [];

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let inputValue = elInput.value;
    elInput.value = '';
    todos.push({
        id:todos.length ? todos.at(-1).id + 1 : 1,
        text: inputValue,
        isCompleted: false
        
    });
    renderTodos(todos, elList)
});

elList.addEventListener('click', (evt) => {
    if(evt.target.matches('.todo-deleted-btn')) {
        let deletedTodoId = evt.target.dataset.todoId;
        let deletedTodoIndex = todos.findIndex((item) => item.id == deletedTodoId);
        todos.splice(deletedTodoIndex, 1);
        renderTodos(todos, elList);
    }
    
    if(evt.target.matches('.todo-edit-btn')) {
        let newText = prompt('Text kiriting');
        
        let editTodoId = evt.target.dataset.todoId;
        let editTodoItem = todos.find((item) => item.id == editTodoId);
        
        editTodoItem.text = newText;
        renderTodos([...todos], elList);
    }
    
    if(evt.target.matches('.todo-checkbox')) {
        let completedTodoId = evt.target.dataset.todoId;
        
        let completedTodoItem = todos.find((item) => item.id == completedTodoId);
        
        completedTodoItem.isCompleted = !completedTodoItem.isCompleted;
        
        renderTodos([...todos], elList);
    }
    
});

function add() {
    elAllBtn.textContent = todos.length;
    let completedBtn = todos.filter((item) => item.isCompleted == true);
    // console.log(completedBtn);
    elCompletedBTn.textContent = completedBtn.length;
    let uncompletedBtn = todos.filter((item) => item.isCompleted == false);
    // console.log(uncompletedBtn);
    elUncompletedBTn.textContent = uncompletedBtn.length;
    
    
}
elBtnPrimary.addEventListener('click',()=> {
    renderTodos([...todos], elList);
});
elBtnSuccess.addEventListener('click',()=> {
    renderTodos([...todos.filter((item) => item.isCompleted == true)],elList);
});
elBtnWarning.addEventListener('click',()=> {
    renderTodos([...todos.filter((item) => item.isCompleted == false)],elList);
});

function renderTodos(array, node) {
    node.innerHTML = "";
    array.forEach((item)=> {
        let newItem = document.createElement('li');
        let newText = document.createElement('span');
        let newInput = document.createElement('input');
        let newDeleteBtn = document.createElement('button');
        let newEditBtn = document.createElement('button');
        
        newText.textContent = item.text;
        newInput.type = 'checkbox';
        newDeleteBtn.textContent = 'Delete';
        newEditBtn.textContent = 'Edit';
        newEditBtn.dataset.todoId = item.id;
        newDeleteBtn.dataset.todoId = item.id;
        newInput.dataset.todoId = item.id;
        
        
        newItem.setAttribute('class', 'list-group-item d-flex align-items-center ');
        newInput.setAttribute('class', 'form-check-input me-2 todo-checkbox');
        newDeleteBtn.setAttribute('class', 'btn btn-danger todo-deleted-btn');
        newEditBtn.setAttribute('class', 'btn btn-warning me-2 todo-edit-btn');
        newText.setAttribute('class', 'flex-grow-1 ')
        
        add();
        
        if(item.isCompleted) {
            newInput.checked = true;
            newText.classList.add('text-decoration-line-through');
        };
        
        newItem.append(newInput, newText, newEditBtn, newDeleteBtn);
        node.appendChild(newItem); 
        
    })
    
}