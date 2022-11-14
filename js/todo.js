const todoList = []; // [{id: number, note: string, isComplete: boolean}]
const checkList = [];

const todoCountRender = () => {
  const count = todoList.filter((todo) => todo.isComplete === true).length;
  const $todoCount = document.getElementById('todoCount');
  const countTextNode = document.createTextNode(`The total number of completions is ${count}.`)

  $todoCount.textContent = '';
  $todoCount.appendChild(countTextNode);
}

const todoListRender = () => {
  const frag = document.createDocumentFragment();
  const $todoListView = document.getElementById('todoListView');

  $todoListView.innerHTML = '';

  todoList.forEach(list => {
    const { id, note, isComplete } = { ...list };

    if (!isComplete) {
      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', `todo${id}`);
      input.setAttribute('data-id', id);
      input.addEventListener('click', stateChange);

      const textNode = document.createTextNode(note);
      const label = document.createElement('label');
      label.setAttribute('for', `todo${id}`);
      label.appendChild(textNode);

      const li = document.createElement('li');
      li.append(input, label);

      frag.appendChild(li);
    }
  });

  $todoListView.appendChild(frag);

  todoCountRender();
};

const addTodo = (e, target) => {
  if (!target.value) return 0;

  const id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
  const note = target.value;

  todoList.push({ id, note, isComplete: false });

  target.value = '';
};

const stateChange = (e) => {
  const target = e.target;
  target.parentElement.classList.toggle('complete');
};

const todoCompletion = () => {
  const completeTodos = document.getElementsByClassName('complete');

  Array.prototype.forEach.call(completeTodos, (todo) => {
    const id = todo.firstElementChild.dataset.id;

    todoList.forEach((todo) => {
      if(todo.id === +id) todo.isComplete = true;
    });
  });
};

const $todoInput = document.getElementById('todoInput');
const $addButton = document.getElementById('addButton');

$todoInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    addTodo(e, e.target);
    todoListRender();
  }
});

$addButton.addEventListener('click', (e) => {
  addTodo(e, $todoInput);
  todoListRender();
});

const $completionButton = document.getElementById('completionButton');

$completionButton.addEventListener('click', () => {
  todoCompletion();
  todoListRender();
});;
