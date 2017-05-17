<template>
  <div id="app">
    <hello></hello>
    <approval></approval>
    <project-apply></project-apply>
  </div>
</template>

<style scoped>


</style>

<script>
import Hello from './components/login.vue';
import approval from './components/approval.vue';
import projectApply from './components/projectapply.vue';

export default {

  components: {
    Hello,
    approval,
    projectApply
  }
}
</script>
