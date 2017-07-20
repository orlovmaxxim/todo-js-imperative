'use strict'

// рабочие константы
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

// pattern фасад - вспомогательная функция createElement
function createElement(tagElem, props, ...children) {
  let elem = document.createElement(tagElem);
  Object.keys(props).forEach(key => elem[key] = props[key]);
  if (children.length > 0) {
    children.forEach(child => {
      if (typeof child === 'string') {
        child = document.createTextNode(child);
      }
      elem.appendChild(child);
    });
  }
  return elem;
}

// прослушка событий
function eveListeners (task) {
  const checkBtn = task.querySelector('.checkbox');
  const editBtn = task.querySelector('button.edit');
  const deleteBtn = task.querySelector('button.delete');

  checkBtn.addEventListener('change', toggleTask);
  editBtn.addEventListener('click', editTask);
  deleteBtn.addEventListener('click', deleteTask);
}


/////////////////////////////////////////////////////////////
// функции событий - чекбокс, удаление, редактирование

function toggleTask () {
  const listItem = this.parentNode;
  listItem.classList.toggle('completed');
}

function editTask (e) {
  let target = e.currentTarget;
  let taskNode = target.parentNode;
  let title = taskNode.querySelector('.title');
  let editInput = taskNode.querySelector('.textfield');
  let isEditing = taskNode.classList.contains('editing');

  if(isEditing) {
    title.innerText = editInput.value;
    target.innerText = 'Change';
  } else {
    editInput.value = title.innerText;
    this.innerText = 'Save';
  }
  taskNode.classList.toggle('editing');
}

function deleteTask (e) {
  let target = e.currentTarget;
  let taskNode = target.parentNode;
  todoList.removeChild(taskNode);
}

/////////////////////////////////////////////////////////////

function createTask (title) {

  const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
  const label = createElement('label', { className: 'title' }, title);
  const editInput = createElement('input', { type: 'text', className: 'textfield' });
  const editBtn = createElement('button', { className: 'edit' }, 'Изменить');
  const deleteBtn = createElement('button', { className: 'delete' }, 'Удалить');
  const li = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editBtn, deleteBtn);

  eveListeners(li);
  return li;
}

function addNewTask (e) {
  e.preventDefault();
  if (todoInput.value === '') {
    return alert('Заполните поле');
  }

  const task = createTask(todoInput.value);
  todoList.appendChild(task);
  todoInput.value = '';
}

function init () {
  // обработчик события для события отправки формы
  todoForm.addEventListener('submit', addNewTask);
  todoItems.forEach(item => eveListeners(item));
}

init();