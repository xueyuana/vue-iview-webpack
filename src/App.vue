<template>
  <div id="app">
    <hello></hello>
    <project-apply></project-apply>
  </div>
</template>

<style scoped>


</style>

<script>
import Hello from './components/login.vue';
import projectApply from './components/projectapply.vue';

export default {

  components: {
    Hello,
    projectApply
  }
}
</script>
