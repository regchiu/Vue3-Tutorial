<template>
  <hello-world msg="About Better Reactivity"></hello-world>
  {{ list }} {{ myObj }}
  <button @click="test">Test</button>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import { ref } from 'vue'
export default {
  components: {
    HelloWorld
  },
  setup() {
    let list = ref([1, 2])
    let a = ref(0)
    let myObj = ref({ firstName: 'Reg' })
    function test() {
      list.value[3] = 3
      myObj.value.lastName = 'Chiu'
      delete myObj.value.firstName
    }
    return { list, myObj, test }
  }
}
</script>