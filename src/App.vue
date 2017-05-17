<template>
  <div id="app">
    <home></home>
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
  import home from './components/home/home.vue';

  import Hello from './components/login/login.vue';


//import addId from './components/addID.vue';
//import approval from './components/approval.vue';
import addAdmin from './components/admin.vue';

import projectApply from './components/common/projectApplication/projectapply.vue';


export default {

  components: {
    home,
    Hello,
    addAdmin,
//    approval,
//   addId
    projectApply

  }
}
</script>
