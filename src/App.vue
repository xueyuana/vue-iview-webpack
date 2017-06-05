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
        this.$store.commit("getOriginPath",from.path);

      }
    }
  }


</script>
