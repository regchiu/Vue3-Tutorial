<template>
  <!-- In this case, child component will expect a firstName/lastName prop and emits update:firstName/update:lastName event to sync: -->
  <input type="text" :value="firstName" @input="$emit('update:firstName', $event.target.value)" />
  <input type="text" :value="lastName" @input="$emit('update:lastName', $event.target.value)" />
</template>

<script>
export default {
  name: 'HelloMultipleVmodel',
  props: {
    firstName: String,
    lastName: String
  }
}
</script>
