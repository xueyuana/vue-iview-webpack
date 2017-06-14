<template>
  <div class="">
    我是首页面
    <div @click="goLogin">控制台</div>
  </div>
</template>

<style scoped>

</style>

<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    methods: {
      goLogin() {
        this.$router.push({name: 'login'})
      }
    }
  }
</script>