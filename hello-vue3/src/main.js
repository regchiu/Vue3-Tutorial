import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
const app = createApp(App)
app.directive('todo-focus', (el, binding) => {
  if (binding.value) {
    el.focus()
  }
})

app.use(router).mount('#app')
