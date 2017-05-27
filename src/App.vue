<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<style scoped>


</style>

<script>
  export default {
    watch: {
      '$route'(to, from) { //form:表示上一级路径
//        console.log(from);
        this.$store.commit("getOriginPath",from.path);
        console.log(this.$store.state.path.originPath);
      }
    }
  }


</script>
