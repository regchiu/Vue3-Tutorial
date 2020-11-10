<template>
  <hello-world msg="About Composition API"></hello-world>
  <h4 ref="firstTitle">Ref</h4>
  <div>
    Count: {{ count }}
    <button @click="count++">Add Count</button>
  </div>
  <h4>Reactive</h4>
  <div>
    Count Object: {{ countObj }}
    <button @click="countObj.count++">Add Count Object</button>
  </div>
  <h4>Read Only</h4>
  <div>
    Read Only Object: {{ readOnlyObj }}
    <button @click="readOnlyObj.count++">Add Read Only Object</button>
  </div>
  <h4>Template Refs</h4>
  <h4>Template Refs inside v-for</h4>
  <div
    v-for="(item, i) in list"
    :ref="
      (el) => {
        if (el) divs[i] = el
      }
    "
  >
    {{ item }}
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import { ref, reactive, watch, readonly, onMounted, onBeforeUpdate } from 'vue'
export default {
  components: {
    HelloWorld
  },
  setup() {
    const count = ref(0)
    watch(count, (count, prevCount) => {
      console.log('New value', count)
      console.log('Old value', prevCount)
    })
    const countObj = reactive({ count: 0 })
    const readOnlyObj = readonly(countObj)
    const firstTitle = ref(null)
    const list = reactive([1, 2, 3])
    const divs = ref([])

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(firstTitle.value) // <h4>Refs</h4>
      console.log(divs.value)
    })
    // make sure to reset the refs before each update
    onBeforeUpdate(() => {
      divs.value = []
    })

    return { count, countObj, readOnlyObj, firstTitle, list, divs }
  }
}
</script>
