// Select the form element
const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.input');
const ulEl = document.querySelector('.list');

// Add event listener to the form element
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  addToDoList();
});

// Initialize the todoList array from localStorage
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Render the todo list items from the stored data
renderToDoList();

// Function to add a new task to the todo list
function addToDoList() {
  const newTask = inputEl.value.trim();

  if (newTask !== '') {
    const task = {
      text: newTask,
      checked: false,
    };

    todoList.push(task);
    saveToDoList();
    renderToDoItem(task);
    inputEl.value = '';
  }
}

// Function to render the todo list items
function renderToDoList() {
  todoList.forEach((task) => {
    renderToDoItem(task);
  });
}

// Function to render a single todo list item
function renderToDoItem(task) {
  const liEl = document.createElement('li');
  liEl.innerText = task.text;
  ulEl.appendChild(liEl);

  if (task.checked) {
    liEl.classList.add('checked');
  }

  const checkBtnEl = document.createElement('div');
  checkBtnEl.innerHTML = '<i class="fas fa-check-square"></i>';
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement('div');
  trashBtnEl.innerHTML = '<i class="fa-solid fa-trash"></i>';
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener('click', () => {
    liEl.classList.toggle('checked');
    task.checked = !task.checked;
    saveToDoList();
  });

  trashBtnEl.addEventListener('click', () => {
    liEl.remove();
    todoList = todoList.filter((item) => item !== task);
    saveToDoList();
  });
}

// Function to save the todo list to local storage
function saveToDoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
