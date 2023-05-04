import './style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.css';
import Task from '../modules/tasks.js';
import List from '../modules/taskList.js';

const newInput = document.querySelector('.new-task');
const errorMessage = document.querySelector('.error');
const list = new List();

window.onload = () => {
  list.display();
};

document.querySelector('.add-list').addEventListener('click', () => {
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
