<template>
  <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ pluralize(remaining) }} left
    </span>
    <ul class="filters">
      <li>
        <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
      </li>
      <li>
        <a href="#/active" :class="{ selected: visibility == 'active' }">Active</a>
      </li>
      <li>
        <a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">Clear completed</button>
  </footer>
</template>
<script>
import { inject } from 'vue'
export default {
  setup() {
    const todos = inject('todos')
    const remaining = inject('remaining')
    const pluralize = inject('pluralize')
    const visibility = inject('visibility')
    const removeCompleted = inject('removeCompleted')
    return { todos, remaining, pluralize, visibility, removeCompleted }
  }
}
</script>
