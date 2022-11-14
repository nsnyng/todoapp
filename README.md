# todoapp

### html, css, javascript를 사용해서 간단한 투두 리스트를 만들었습니다.

## 2022.11.13
<p>header, main, footer 로 간단히 구조를 잡았습니다.</p>
<ul>
  <li>header: 타이틀</li>
  <li>main: 
    <ul>
      <li>input: 할 일을 작성하는 입력부</li>
      <li>list: 미완료 상태의 할 일을 보여주는 목록</li>
    </ul>
  </li>
  <li>footer: 
    <ul>
      <li>left: 선택한 할 일을 완료 상태로 바꾸는 버튼</li>
      <li>right: 완료한 할 일의 총 개수</li>
    </ul>
  </li>
</ul>

<p>입력부에 글자를 쓰고 엔터를 입력하거나 Add 버튼을 클릭하면 목록에 추가합니다. 목록은 임시로 전역 변수에 추가하는 것으로 처리했습니다. 추후에 local storage로 변경할 예정입니다.</p>

```javascript
const todoList = []; // [{id: number, note: string, isComplete: boolean}]

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
```

<p>maxlength는 40으로 제한했습니다. 입력한 값이 없으면 이벤트가 발생하지 않도록 처리했습니다.</p>

```javascript
const addTodo = (e, target) => {
  if (!target.value) return 0;

  const id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
  const note = target.value;

  todoList.push({ id, note, isComplete: false });

  target.value = '';
};
```

## 2022.11.14
<p>목록의 체크 이벤트가 발생하면 class에 complete를 추가하여 line-through 스타일을 줄 수 있도록 했습니다.</p>

```javascript
const stateChange = (e) => {
  const target = e.target;
  target.parentElement.classList.toggle('complete');
};

```
<p>체크 후 Completion 버튼을 클릭하면 해당 할 일의 isComplete 값을 true로 변경하고 목록을 재생성합니다. 목록 생성시에는 isComplete가 false인 객체만 추가합니다.</p>

```javascript
const todoCompletion = () => {
  const completeTodos = document.getElementsByClassName('complete');

  Array.prototype.forEach.call(completeTodos, (todo) => {
    const id = todo.firstElementChild.dataset.id;

    todoList.forEach((todo) => {
      if(todo.id === +id) todo.isComplete = true;
    });
  });
};

$completionButton.addEventListener('click', () => {
  todoCompletion();
  todoListRender();
});;
```

<p>목록 재생성 시 완료한 할 일의 총 개수도 목록 배열을 돌며 isComplete 값이 true인 객체의 개수를 구하여 표시합니다.</p>

```javascript
const todoCountRender = () => {
  const count = todoList.filter((todo) => todo.isComplete === true).length;
  const $todoCount = document.getElementById('todoCount');
  const countTextNode = document.createTextNode(`The total number of completions is ${count}.`)

  $todoCount.textContent = '';
  $todoCount.appendChild(countTextNode);
}
```



<p>사용자가 이벤트를 발생시키기 전, 처음부터 표시 될 수 있도록 DOMContentLoaded 시 화면 생성 함수가 작동하도록 했습니다.</p>

```javascript

document.addEventListener('DOMContentLoaded', todoListRender);

```
