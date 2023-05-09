import status from './status.js';

const list = document.querySelector('ul');
const newInput = document.querySelector('.new-task');
const errorMessage = document.querySelector('.error');

// list class
export default class List {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // remove task from the list function
   removeList = (task) => {
     this.tasks = this.tasks.filter((t) => t !== task);
     localStorage.setItem('tasks', JSON.stringify(this.tasks));
     list.innerHTML = '';
   };

   // add task to the list function
    addList = (task) => {
      this.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      newInput.value = '';
      errorMessage.classList.add('error');
    };

    // sort task index of the list function
    sort = () => {
      for (let i = 0; i < this.tasks.length; i += 1) {
        this.tasks[i].index = i + 1;
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    };

    // edit task description of the list function
    updateList = (task, t, icon) => {
      icon.classList.toggle('fa-pen-to-square');
      icon.classList.toggle('fa-check');
      task.readOnly = false;
      task.focus();
      task.addEventListener('input', function update() {
        task.value = this.value;
        t.description = task.value;
      });
    };

    // finsh editing task description of the list function
      completeUpdate = (task) => {
        task.readOnly = true;
        list.innerHTML = '';
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      };

      // display lists
      display = () => {
        list.innerHTML = this.tasks.sort((a, b) => a.index - b.index).reduce((output, task) => (
          `${output
          }
                   <li>
                   <div class="to-do-list-container">
                   <div class="list-input-container">
                   <input class="check-list" type="checkbox" id="myCheckbox" name="myCheckbox" ${task.completed ? 'checked' : ''}>
                   <input class="task" value='${task.description}' readonly/>
                   </div>
                   <div class="list-btn-container">
                   <button class="edit"><i class="edit-icon fa-solid fa-pen-to-square"></i></button>
                   <button class="delete"><i class="fa-solid fa-trash"></i></button>
                   </div>
                   </div>
                   </li>
                  `
        ), '');
        const deleteList = document.querySelectorAll('.delete');
        deleteList.forEach((btn, index) => {
          btn.addEventListener('click', () => {
            this.removeList(this.tasks[index]);
            this.sort();
            this.display();
          });
        });
        const editList = document.querySelectorAll('.edit');
        const inputTask = document.querySelectorAll('.task');
        const editIcon = document.querySelectorAll('.edit-icon');
        editList.forEach((btn, index) => {
          let c = 0;
          btn.addEventListener('click', () => {
            if (c % 2 === 0) {
              this.updateList(inputTask[index], this.tasks[index], editIcon[index]);
              c += 1;
            } else {
              this.completeUpdate(inputTask[index]);
              this.display();
              c += 1;
            }
          });
        });

        const checkList = document.querySelectorAll('.check-list');
        checkList.forEach((btn, index) => {
          btn.addEventListener('click', () => {
            status(this.tasks[index]);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          });
        });
      };
}