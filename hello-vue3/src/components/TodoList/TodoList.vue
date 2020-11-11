<template>
  <section class="todoapp">
    <todo-list-header />
    <todo-list-main />
    <todo-list-footer />
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>
<script>
import { ref, reactive, provide, computed, watch } from 'vue'
import TodoListHeader from './TodoListHeader.vue'
import TodoListMain from './TodoListMain.vue'
import TodoListFooter from './TodoListFooter.vue'
export default {
  components: {
    TodoListHeader,
    TodoListMain,
    TodoListFooter
  },
  setup(props) {
    const STORAGE_KEY = 'todos-vuejs-3.0'
    const todoStorage = {
      fetch: function () {
        const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        todos.forEach((todo, index) => {
          todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
      },
      save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      }
    }

    const filters = {
      all: function (todos) {
        return todos
      },
      active: function (todos) {
        return todos.filter(function (todo) {
          return !todo.completed
        })
      },
      completed: function (todos) {
        return todos.filter(function (todo) {
          return todo.completed
        })
      }
    }
    const todos = reactive(todoStorage.fetch())
    const newTodo = ref('')
    const editedTodo = ref(null)
    const visibility = ref('all')
    const beforeEditCache = ref('')

    watch(todos, (todos, prevTodos) => {
      todoStorage.save(todos)
    })

    // computed
    const filteredTodos = computed(() => filters[visibility.value](todos))
    const remaining = computed(() => filters.active(todos).length)
    const allDone = computed({
      get: () => remaining.value === 0,
      set: (value) => {
        todos.forEach((todo) => {
          todo.completed = value
        })
      }
    })

    // methods
    const editTodo = (todo) => {
      beforeEditCache.value = todo.title
      editedTodo.value = todo
    }

    const removeTodo = (todo) => {
      todos.splice(todos.indexOf(todo), 1)
    }

    const doneEdit = (todo) => {
      if (!editedTodo.value) {
        return
      }
      editedTodo.value = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        removeTodo(todo)
      }
    }

    const pluralize = (value) => {
      return value === 1 ? 'item' : 'items'
    }

    const cancelEdit = (todo) => {
      editedTodo.value = null
      todo.title = beforeEditCache.value
    }

    const removeCompleted = () => {
      const completed = filters.completed(todos)
      completed.forEach((todo) => {
        todos.splice(todos.indexOf(todo), 1)
      })
    }

    const onHashChange = () => {
      const v = window.location.hash.replace(/#\/?/, '')
      if (filters[v]) {
        visibility.value = v
      } else {
        window.location.hash = ''
        visibility.value = 'all'
      }
    }

    window.addEventListener('hashchange', onHashChange)
    onHashChange()

    // provide
    provide('todoStorage', todoStorage)
    provide('filters', filters)
    provide('todos', todos)
    provide('newTodo', newTodo)
    provide('editedTodo', editedTodo)
    provide('visibility', visibility)
    provide('filteredTodos', filteredTodos)
    provide('remaining', remaining)
    provide('allDone', allDone)
    provide('editTodo', editTodo)
    provide('removeTodo', removeTodo)
    provide('doneEdit', doneEdit)
    provide('cancelEdit', cancelEdit)
    provide('pluralize', pluralize)
    provide('removeCompleted', removeCompleted)
  }
}
</script>
