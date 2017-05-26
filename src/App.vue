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
      '$route'(to, from) { //to:对象,to.path表示要取到的路径 ,form:表示上一级路径
//        console.log(from);
        this.$store.commit("getOriginPath",from.path);
        console.log(this.$store.state.path.originPath);
        // 对路由变化作出响应...
//                if(to.path.toLowerCase()=='/home' || to.path.toLowerCase()=='/member' || to.path.toLowerCase()=='/shopcart' || to.path.toLowerCase()=='/settings'){
//                    this.isShow=false;
//                }else {
//                    this.isShow=true;
//                }
      }
    }
  }


</script>
