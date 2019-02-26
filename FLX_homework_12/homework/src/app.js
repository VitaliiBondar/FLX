let rootNode = document.getElementById('root');
rootNode.style.textAlign='center';
const HASH_MAIN = '';
const HASH_ADD = '#/add';
const HASH_MODIFY = '#/modify/';
let id = 0;
let findElement = -1;
let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
let doneItems = JSON.parse(localStorage.getItem('doneItems')) || [];

function setToLocalStorage(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
}

function render(){
        if (location.hash === HASH_MAIN) {
            renderMain();
        }

        if (location.hash === HASH_ADD) {
            renderAdd();
        }

        if (location.hash.includes(HASH_MODIFY)) {
            renderModify();
        }
}

function renderMain() {
    rootNode.innerHTML = '';
    let h1 = document.createElement('h1');
    let h1TextNode = document.createTextNode('Simple TODO application');
    let btnAdd = document.createElement('button');
    let btnAddTextNode = document.createTextNode('Add new task');
    rootNode.appendChild(h1);
    h1.appendChild(h1TextNode);
    rootNode.appendChild(btnAdd);
    btnAdd.appendChild(btnAddTextNode);
    btnAdd.setAttribute('class', 'button');
    let data = todoItems.concat(doneItems);
    if (!data.length) {
        let msgArea = document.createElement('p');
        let msg = document.createTextNode('TODO is empty');
        rootNode.appendChild(msgArea);
        msgArea.setAttribute('class', 'msg-empty');
        msgArea.appendChild(msg);
    } else {
        let listItems = document.createElement('ul');
        rootNode.appendChild(listItems);
        data.forEach((item) => {
            let listItem = document.createElement('li');
            let checkbox = document.createElement('img');
            let action = document.createElement('a');
            let actionText = document.createTextNode(item.description);
            listItem.setAttribute('class', 'todo-list-item');
            rootNode.appendChild(listItem);
            listItem.setAttribute('id', item.id);
            listItem.appendChild(checkbox);
            checkbox.setAttribute('class', 'checkbox');
            listItem.appendChild(action);
            action.appendChild(actionText);
            action.setAttribute('class', 'desc');
            action.setAttribute('href', `${HASH_MODIFY}${item.id}`);
            if (!item.isDone) {
                checkbox.setAttribute('src', './assets/img/todo-s.png');
            } else {
                checkbox.setAttribute('src', './assets/img/done-s.png');
                action.style.backgroundColor = 'grey';
            }
            checkbox.addEventListener('click', handlerChecked);
            let remove = document.createElement('img');
            listItem.appendChild(remove);
            remove.setAttribute('src', './assets/img/remove-s.jpg');
            remove.addEventListener('click', removeActionItem);
        });
    }
    btnAdd.addEventListener('click', addPage);
}

function renderAdd() {
    rootNode.innerHTML = '';

    let h1 = document.createElement('h1');
    let input = document.createElement('input');
    let wrapper = document.createElement('div');
    let btnCancel = document.createElement('button');
    let btnCancelTextNode = document.createTextNode('Cancel');
    let btnSave = document.createElement('button');
    let btnSaveTextNode = document.createTextNode('Save changes');
    let h1TextNode = document.createTextNode('Add task');
    rootNode.appendChild(h1);
    h1.appendChild(h1TextNode);
    input.setAttribute('id', 'inputs');
    rootNode.appendChild(input);
    wrapper.setAttribute('class', 'buttons');
    rootNode.appendChild(wrapper);
    wrapper.appendChild(btnCancel);
    btnCancel.setAttribute('class', 'button');
    btnCancel.appendChild(btnCancelTextNode);
    wrapper.appendChild(btnSave);
    btnSave.setAttribute('class', 'button');
    btnSave.appendChild(btnSaveTextNode);
    btnCancel.addEventListener('click', mainPage);
    btnSave.addEventListener('click', afterAdd);
}

function renderModify() {
    let id = parseInt(location.hash.split('/').pop());
    let itemToModify = todoItems.find(item => item.id === id);
    if (!itemToModify) {
        window.location.hash = HASH_MAIN;
        return;
    }
    rootNode.innerHTML = '';
    let h1 = document.createElement('h1');
    let h1TextNode = document.createTextNode('Modify item');
    let input = document.createElement('input');
    let wrapper = document.createElement('div');
    let btnCancel = document.createElement('button');
    let btnCancelTextNode = document.createTextNode('Cancel');
    let btnSave = document.createElement('button');
    let btnSaveTextNode = document.createTextNode('Save changes');
    rootNode.appendChild(h1);
    h1.appendChild(h1TextNode);
    input.setAttribute('id', 'inputs');
    rootNode.appendChild(input);
    input.defaultValue = itemToModify.description;
    wrapper.setAttribute('class', 'buttons');
    rootNode.appendChild(wrapper);
    wrapper.appendChild(btnCancel);
    btnCancel.setAttribute('class', 'button');
    btnCancel.appendChild(btnCancelTextNode);
    wrapper.appendChild(btnSave);
    btnSave.setAttribute('class', 'button');
    btnSave.appendChild(btnSaveTextNode);
    btnCancel.addEventListener('click', mainPage);
    btnSave.addEventListener('click', afterModify);
}

function changeId() {
    let items = todoItems.concat(doneItems);
    for (let i = 0; i<items.length; i++) {
        let item = items[i];
        if (item.id > id) {
            id = item.id;
        }
    }
    id++;
    return id;
}

function handlerChecked(event) {
    let id = parseInt(event.target.parentNode.id);
    let indexDeletedItem = todoItems.findIndex(item => item.id === id);
    if (indexDeletedItem === findElement) {
        return
    }
    let activeItem = todoItems[indexDeletedItem];
    activeItem.isDone = true;
    todoItems.splice(indexDeletedItem, 1);
    doneItems.push(activeItem);
    setToLocalStorage(todoItems, 'todoItems');
    setToLocalStorage(doneItems, 'doneItems');
    renderMain();
}

function removeActionItem(event) {
    let id = parseInt(event.target.parentNode.id);
    let removeFromTodoItems = todoItems.findIndex(item => item.id === id);
    if (removeFromTodoItems !== findElement) {
        todoItems.splice(removeFromTodoItems, 1);
    }
    let removeFromDoneItems = doneItems.findIndex(item => item.id === id);

    if (removeFromDoneItems !== findElement) {
        doneItems.splice(removeFromDoneItems, 1);
    }

    setToLocalStorage(todoItems, 'todoItems');
    setToLocalStorage(doneItems, 'doneItems');

    renderMain();
}

function mainPage(event) {
    window.location.hash = HASH_MAIN;
    event.preventDefault();
}

function addPage(event) {
    window.location.hash = HASH_ADD;
    event.preventDefault();
}

function afterAdd(event) {
    let newAction = document.getElementById('inputs').value;

    if (!newAction) {
        return;
    }
    todoItems.push({isDone: false, id: changeId(), description: newAction});
    setToLocalStorage(todoItems, 'todoItems');
    mainPage(event);
}

function afterModify(event) {
    let item = document.getElementById('inputs').value;

    if (!item) {
        return;
    }
    let id = parseInt(location.hash.split('/').pop());
    todoItems.find(item => item.id === id).description = item;
    setToLocalStorage(todoItems, 'todoItems');
    mainPage(event);
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);