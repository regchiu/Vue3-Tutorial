<template>
  <hello-teleport-button></hello-teleport-button>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
  <div class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about-composition-api">About Composition API</router-link> |
    <router-link to="/about-multiple-vmodel">About Multiple v-model</router-link> |
    <router-link to="/about-better-reactivity">About Better Reactivity</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
import HelloTeleportButton from './components/HelloTeleportButton.vue'
export default {
  name: 'App',
  components: {
    HelloTeleportButton
  }
}
</script>
