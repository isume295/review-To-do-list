import './style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.css';
import Task from '../modules/tasks.js';
import List from '../modules/taskList.js';

const newInput = document.querySelector('.new-task');
const errorMessage = document.querySelector('.error');
const list = new List();

// display to do list from local storage
window.onload = () => {
  list.display();
};

// click event when user click the add button
document.querySelector('.add-list').addEventListener('click', (e) => {
  e.preventDefault();
  const i = list.tasks.length;
  if (newInput.value === '') {
    errorMessage.innerHTML = 'Please enter a task to add to the to-do list';
    errorMessage.classList.remove('error');
    document.querySelector('.list-container').classList.add('shake');
    setTimeout(() => {
      document.querySelector('.list-container').classList.remove('shake');
    }, 1000);
  } else {
    const newTask = new Task(newInput.value, false, i + 1);
    list.addList(newTask);
    list.display();
  }
});

// clear/delete all selected list functionality
const clearAll = document.querySelector('.clearAll');
clearAll.addEventListener('click', () => {
  list.tasks = list.tasks.filter((task) => task.completed === false);
  localStorage.setItem('tasks', JSON.stringify(list.tasks));
  list.display();
});