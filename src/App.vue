<template>
  <div id="app">
    <hello></hello>

    <!--<add-id></add-id>-->
    <!--<approval></approval>-->
    <add-admin></add-admin>

    <project-apply></project-apply>

  </div>
</template>

<style scoped>


</style>

<script>
import Hello from './components/login.vue';

//import addId from './components/addID.vue';
//import approval from './components/approval.vue';
import addAdmin from './components/admin.vue';

import projectApply from './components/projectapply.vue';


export default {

  components: {
    Hello,
    addAdmin,
//    approval,
//   addId
    projectApply

  }
}
</script>
