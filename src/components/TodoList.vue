<template>
  <div>
    <div>
      <input type="text" v-model="newTodo" @keyup.enter="addTodo" />
      <button @click="addTodo()">Add Todo</button>
    </div>

    <div v-if="todos.length > 0">
      <li class="todo-item" v-for="(todo, i) in todos" :key="i">
        <span v-text="todo.text" />
      </li>
    </div>

    <div v-else class="no-todo" >
      <p>No Todos</p>
    </div>
  </div>
</template>

<script>

import TodoClient from '../api/todo-client'

export default {
  data: () => ({
    newTodo: '',
    todos: [],
  }),

  created() {
    TodoClient.getTodos().then(todos => {
      this.todos = todos
    });
  },
  methods: {
    addTodo() {
      TodoClient.addTodo(this.newTodo)
        .then(({id}) => {
          console.log('here');
          this.todos.push({
            id,
            text: this.newTodo,
          });
          this.newTodo = ''
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>