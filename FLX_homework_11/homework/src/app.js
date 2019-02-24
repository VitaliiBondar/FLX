let counterActions = 0;
let dragElement = null;
const MAX_ACTIONS = 10;
let mainInput = document.getElementById('main-input');
let addActionButton = document.getElementById('add-button');
let actionList = document.getElementById('action-list');

function addNewAction() {
    counterActions++;
    let actionItem = document.createElement('li');
    let actionWrapper = document.createElement('div');
    let checkedDiv = document.createElement('i');
    let action = document.createElement('p');
    let deleteImg = document.createElement('i');
    let checkedDivText = document.createTextNode('check_box_outline_blank');
    let actionText = document.createTextNode(mainInput.value);
    let deleteImgText = document.createTextNode('delete');
    actionWrapper.setAttribute('class', 'action-wrapper');
    checkedDiv.setAttribute('class', 'material-icons unchecked');
    deleteImg.setAttribute('class', 'material-icons delete');
    addActionButton.setAttribute('class', 'material-icons md-dark md-inactive');
    actionItem.appendChild(actionWrapper);
    actionWrapper.appendChild(checkedDiv);
    checkedDiv.appendChild(checkedDivText);
    actionWrapper.appendChild(action);
    action.appendChild(actionText);
    actionItem.appendChild(deleteImg);
    deleteImg.appendChild(deleteImgText);
    actionItem.setAttribute('draggable', 'true');
    actionItem.addEventListener('dragstart', dragBegin, false);
    actionItem.addEventListener('dragover', dragOver, false);
    actionItem.addEventListener('drop', dragEnd, false);
    actionItem.setAttribute('class', 'action-item');
    actionList.appendChild(actionItem);
    actionList.addEventListener('click', inputActions);
    addActionButton.style.cursor = 'default';
    mainInput.value = '';
}

function inputActivity() {
    if (mainInput.value.trim()) {
        addActionButton.setAttribute('class', 'material-icons');
        addActionButton.style.cursor = 'pointer';
    } else {
        addActionButton.setAttribute('class', 'material-icons md-dark md-inactive');
    }
}

function checkActionsLimit() {
    if (mainInput.value.trim()) {
        if (counterActions < MAX_ACTIONS) {
            addNewAction();
        }
        if (counterActions === MAX_ACTIONS) {
            let warningText = document.createTextNode('Maximum item per list are created');
            document.getElementById('notification').appendChild(warningText);
            mainInput.setAttribute('disabled', 'disabled');
            mainInput.value = '';
        }
    }
}

function inputActions(event) {
    if (event.target.classList.contains('delete')) {
        deleteAction(event);
    }
    if (event.target.classList.contains('unchecked')) {
        markDone(event);
    }
}

function markDone(event) {
    event.target.textContent = 'check_box';
    event.target.setAttribute('id', 'checked');
}

function deleteAction(event) {
    counterActions--;
    addActionButton.style.cursor = 'pointer';
    event.target.parentElement.remove();
    document.getElementById('notification').innerHTML = '';
    mainInput.removeAttribute('disabled');
}

function dragBegin(event) {
    dragElement = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnd(event) {
    event.stopPropagation();
    if (dragElement !== this) {
        dragElement.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData('text/html');
        this.addEventListener('click', inputActions);
        dragElement.addEventListener('click', inputActions);
    }
}
mainInput.addEventListener('keyup', inputActivity);
addActionButton.addEventListener('click', checkActionsLimit);