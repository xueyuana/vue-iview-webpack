<template>
  <div id="app">
    <hello></hello>
    <project-query></project-query>
  </div>
</template>

<style scoped>


</style>

<script>
import Hello from './components/login.vue';
import projectApply from './components/projectapply.vue';
import projectQuery from './components/projectquery.vue';

export default {

  components: {
    Hello,
    projectApply,
    projectQuery
  }
}
</script>
