<template>
  <teleport to="#end-of-body" :disabled="!showText">
    <!-- This is saved state, if you want to hide video, try add v-if="showText" in teleport -->
    <video width="400" controls>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
      Your browser does not support HTML video.
    </video>
  </teleport>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld hi="Hi"/><br>
  <button @click="showText =! showText">Toggle showText</button>
  <button @click="reactObj.count++">Add reactObj</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref, provide, reactive} from 'vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const msg = ref('Hello Vue 3.0 + Vite')
    const reactObj = reactive({
      count: 0
    })
    const showText = ref(false)
    provide('msg', msg)
    provide('reactObj', reactObj)
    return { showText, reactObj}
  }
}
</script>
