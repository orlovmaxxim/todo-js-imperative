'use strict'

// рабочие константы
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('todo-item');

function createTask (title) {
  // checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';

  // label
  const label = document.createElement('label');
  label.innerText = title;
  label.className = 'title';

  // edit input
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'textfield';

  // edit btn
  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.className = 'edit';

  // delete btn
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'delete';

  // li
  const li = document.createElement('li');
  li.className = 'todo-item';

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editInput);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

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
  console.log(task);
}

// обработчик события для события отправки формы
todoForm.addEventListener('submit', addNewTask);