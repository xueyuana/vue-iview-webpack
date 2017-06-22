<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<style scoped>
  #app {
    width: 100%;
    height: 100%;
  }

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
