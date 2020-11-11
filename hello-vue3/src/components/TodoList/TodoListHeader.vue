<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      autofocus
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
  </header>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'TodoListHeader',
  setup() {
    const todos = inject('todos')
    const newTodo = inject('newTodo')
    const todoStorage = inject('todoStorage')

    const addTodo = () => {
      const value = newTodo.value && newTodo.value.trim()
      if (!value) {
        return
      }
      todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      newTodo.value = ''
    }
    return { todos, newTodo, addTodo }
  }
}
</script>
