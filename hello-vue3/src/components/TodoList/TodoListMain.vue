<template>
  <section class="main" v-show="todos.length" v-cloak>
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
    <label for="toggle-all"></label>
    <ul class="todo-list">
      <li
        v-for="todo in filteredTodos"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo == editedTodo }"
      >
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input
          class="edit"
          type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)"
        />
      </li>
    </ul>
  </section>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const filters = inject('filters')
    const todos = inject('todos')
    const editedTodo = inject('editedTodo')
    const visibility = inject('visibility')
    const allDone = inject('allDone')
    const filteredTodos = inject('filteredTodos')
    const editTodo = inject('editTodo')
    const removeTodo = inject('removeTodo')
    const doneEdit = inject('doneEdit')
    const cancelEdit = inject('cancelEdit')
    
    return { todos, allDone, filteredTodos, editedTodo, editTodo, removeTodo, doneEdit, cancelEdit }
  }
}
</script>
