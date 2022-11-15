const todoCountRender = () => {
  const todoList = tdls.get();

  const count = todoList ? todoList.filter((todo) => todo.isComplete === true).length : 0;

  const $todoCount = document.getElementById('todoCount');
  const countTextNode = document.createTextNode(`The total number of completions is ${count}.`)

  $todoCount.textContent = '';
  $todoCount.appendChild(countTextNode);
}

const todoListRender = () => {
  const frag = document.createDocumentFragment();
  const $todoListView = document.getElementById('todoListView');

  $todoListView.innerHTML = '';

  const todoList = tdls.get();

  todoList?.forEach(list => {
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

  const todoList = tdls.get();
  const note = target.value;
  
  let id = 1;
  if(todoList) id = todoList[todoList.length - 1].id + 1;

  tdls.set(id, note);
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

    tdls.completion(id);
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
