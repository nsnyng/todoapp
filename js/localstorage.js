class TodoLocalStorage {
  key = 'todoList';

  constructor(key) {
    this.key = key
  }
  
  get () {
    return JSON.parse(localStorage.getItem(this.key));
  }

  set ( id, note, isComplete = false ) {
    const todos = JSON.parse(localStorage.getItem(this.key)) || [];
    todos.push({ id, note, isComplete });
    localStorage.removeItem(this.key);
    localStorage.setItem(this.key, JSON.stringify(todos));
  }

  completion (id) {
    const todos = JSON.parse(localStorage.getItem(this.key));
    todos.forEach(todo => {
      if (+todo.id === +id) todo.isComplete = true;
    });
    localStorage.removeItem(this.key);
    localStorage.setItem(this.key, JSON.stringify(todos));
  }
}

const tdls = new TodoLocalStorage('todoList');