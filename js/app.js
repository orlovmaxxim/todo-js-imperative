'use strict'

// рабочие константы
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

// вспомогательные функции
function createInputElem (typeElem, classElem) {
  let elem = document.createElement('input');
  elem.type = typeElem;
  elem.className = classElem;
  return elem;
}

function createDomElem (tagElem, text, classElem) {
  let elem = document.createElement(tagElem);
  elem.innerText = text;
  elem.className = classElem;
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
  // checkbox
  const checkbox = createInputElem('checkbox', 'checkbox');
  // label
  const label = createDomElem('label', title, 'title');
  // edit input
  const editInput = createInputElem('text', 'textfield');
  // edit btn
  const editBtn = createDomElem('button', 'Edit', 'edit');
  // delete btn
  const deleteBtn = createDomElem('button', 'Delete', 'delete');
  // li
  const li = document.createElement('li');
  li.className = 'todo-item';

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editInput);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

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