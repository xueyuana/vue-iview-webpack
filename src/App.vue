<template>
  <div id="app">
    <hello></hello>
    <!--<add-id></add-id>-->
    <!--<approval></approval>-->
    <add-admin></add-admin>
  </div>
</template>

<style scoped>


</style>

<script>
import Hello from './components/login.vue';
//import addId from './components/addID.vue';
//import approval from './components/approval.vue';
import addAdmin from './components/admin.vue';

export default {

  components: {
    Hello,
    addAdmin,
//    approval,
//   addId
  }
}
</script>


