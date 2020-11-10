<template>
  <hello-world msg="About Multiple v-model"></hello-world>
  <p>First name: {{ firstName }}</p>
  <p>Last name: {{ lastName }}</p>
  <hello-multiple-vmodel v-model:first-name="firstName" v-model:last-name="lastName" />
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import HelloMultipleVmodel from '../components/HelloMultipleVmodel.vue'
export default {
  components: {
    HelloWorld,
    HelloMultipleVmodel
  },
  data() {
    return {
      firstName: 'Reg',
      lastName: 'Chiu'
    }
  }
}
</script>
