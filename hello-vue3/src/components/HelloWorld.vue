<template>
  <h1>{{ hi }}</h1>
  <h1>{{ msg }}</h1>
  <h2>{{ reactObj }}</h2>
  <button ref="countButton" @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  inject,
} from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    hi: String
  },
  setup(props) {
    onBeforeMount(() => {
      console.log('Before Mount!')
    })
    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(countButton.value) // <button>count is: 0</button>
      console.log('Mounted!')
    })
    onBeforeUpdate(() => {
      // make sure to reset the refs before each update
      divs.value = []
      console.log('Before Update!')
    })
    onUpdated(() => console.log('Updated!'))
    onBeforeUnmount(() => console.log('Before Unmount!'))
    onUnmounted(() => console.log('Unmounted!'))
    watch(() => console.log(props.hi))
    const count = ref(0)
    const countButton = ref(null)
    const list = reactive([1, 2, 3])
    const divs = ref([])
    const msg = inject('msg')
    const reactObj = inject('reactObj')
    return { count, reactObj, countButton, msg, list, divs }
  },
}
</script>
