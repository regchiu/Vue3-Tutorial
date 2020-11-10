<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props, context) {
    console.log('props', props)
    console.log('context', context)
    onBeforeMount(() => {
      console.log('Before Mount!')
    })
    onMounted(() => {
      console.log('Mounted!')
    })
    onBeforeUpdate(() => {
      console.log('Before Update!')
    })
    onUpdated(() => console.log('Updated!'))
    onBeforeUnmount(() => console.log('Before Unmount!'))
    onUnmounted(() => console.log('Unmounted!'))
  }
}
</script>
