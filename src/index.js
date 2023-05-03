import './style.css';

const tasks = [
  {
    description: 'task 1',
    completed: false,
    index: 0,
  },
  {
    description: 'task 2',
    completed: false,
    index: 1,
  },
  {
    description: 'task 3',
    completed: false,
    index: 2,
  },
];
const list = document.querySelector('ul');
const display = () => {
  list.innerHTML = tasks.sort((a, b) => a.index - b.index).reduce((output, task) => (
    `${output
    }
             <li>${task.description}</li>
            `
  ), '');
};

window.onload = () => {
  display();
};