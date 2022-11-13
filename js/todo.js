
const todoList = [];

const todoListRender = () => {
  const frag = document.createDocumentFragment();
  const $todoListView = document.getElementById('todoListView');

  $todoListView.innerHTML = '';

  todoList.forEach(list => {
    const { id, note } = {...list};
    
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `todo${id}`);
    input.setAttribute('data-id', id);

    const textNode = document.createTextNode(note);
    const label = document.createElement('label');
    label.setAttribute('for', `todo${id}`);
    label.appendChild(textNode);

    const li = document.createElement('li');
    li.append(input, label);

    frag.appendChild(li);
  });

  $todoListView.appendChild(frag);
};

const addTodo = (e, target) => {
  if (!(target.value && e.type !== 'keydown' || target.value && e.type === 'keydown' && e.key === 'Enter')) return 0;

  const id = todoList.length === 0 ? 1 : todoList[todoList.length-1].id + 1;
  const note = target.value;

  todoList.push({id, note});
  todoListRender();
};


const $todoInput = document.getElementById('todoInput');
const $button = document.getElementById('addButton');

$todoInput.addEventListener('keydown', (e) => addTodo(e, e.target));
$button.addEventListener('click', (e) => addTodo(e, $todoInput));