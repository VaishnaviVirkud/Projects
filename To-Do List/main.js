document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  function saveToLocalStorage() {
    const todoListItems = [...todoList.querySelectorAll('li')].map(li => {
      const checkbox = li.querySelector('.form-check-input');
      const isChecked = checkbox.checked;
      const textContent = li.textContent.trim();
      return { isChecked, textContent };
    });
    localStorage.setItem('todoList', JSON.stringify(todoListItems));
  }

  function loadFromLocalStorage() {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (storedTodoList) {
      storedTodoList.forEach(todo => {
        const newTodo = document.createElement('li');
        newTodo.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        newTodo.innerHTML = `
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="true" id="todoCheckbox" ${todo.isChecked ? 'checked' : ''}>
            <label class="form-check-label" for="todoCheckbox" style="${todo.isChecked ? 'text-decoration: line-through' : ''}">
              ${todo.textContent}
            </label>
          </div>
          <span>
            <i class="fa-solid fa-pen text-primary mr-2 edit-icon"></i>
            <i class="fa-solid fa-trash text-danger delete-icon"></i>
          </span>
        `;
        todoList.appendChild(newTodo);
      });
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoInput.value.trim()) {
      const newTodo = document.createElement('li');
      newTodo.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      newTodo.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="true" id="todoCheckbox">
        <label class="form-check-label" for="todoCheckbox">
          ${todoInput.value}
        </label>
      </div>
      <span>
        <i class="fas fa-pen text-primary mr-2 edit-icon"></i>
        <i class="fas fa-trash text-danger delete-icon"></i>
      </span>
    `;
      todoList.appendChild(newTodo);
      todoInput.value = '';
      saveToLocalStorage();
    }
  });

  todoList.addEventListener('click', (e) => {
    if (e.target.matches('.edit-icon')) {
      const parent = e.target.parentNode.parentNode;
      const todoText = parent.querySelector('label');
      const updatedText = prompt('Update list item');
      if (updatedText.trim()) {
        todoText.textContent = updatedText;
        saveToLocalStorage();
      }
    } else if (e.target.matches('.delete-icon')) {
      const parent = e.target.parentNode.parentNode;
      parent.remove();
      saveToLocalStorage();
    } else if (e.target.matches('.form-check-input')) {
      const parent = e.target.parentNode.parentNode;
      const checkbox = parent.querySelector('.form-check-input');
      const label = parent.querySelector('label');
      if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
      } else {
        label.style.textDecoration = 'none';
      }
      saveToLocalStorage();
    }
  });

  loadFromLocalStorage();
});
