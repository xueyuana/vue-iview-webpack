<template>
  <div class="page" :class="active">
    <header class="item head">
      <i class="logo"></i>
      <ul class="nav">
        <li :class="{itemActive: currentIndex === (index+2)}" @click="toTabs(index)" v-for="(item, index) in tabsData">{{item}}</li>
      </ul>
      <div class="button" @click="toConsole">控制台</div>
    </header>
    <div class="content">
      <keep-alive>
        <router-view  @changactive="changeIndex"></router-view>
      </keep-alive>
    </div>
    <footer class="item foot">
      <div class="copyright"><p>© 2017 MEHIEFKSHNK - All Right Reserved</p></div>
      <i class="arrow"></i>
      <i class="top" @click="toTop"></i>
    </footer>
  </div>

</template>

<style lang="less" scoped>
  @headH: 100px;

  .page {
    width: 100%;
    height: 100%;
    font-size: 18px;
    background: #F8F8F9;
    position: relative;
    color: #303030;
    a {
      color: #303030;
    }

    .item {
      position: absolute;
      height: @headH;
      width: 100%;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 200;
      transition: 1.2s;

      &.head {
        top: 0;
        background-color: #fff;

        .logo {
          width: 87px;
          height: 70px;
          background: url("image/logo2.png") no-repeat 0 0;
          background-size: contain;
        }
        .nav {
          li {
            display: inline-block;
            height: 35px;
            margin: 0 20px;
            cursor: pointer;
            border-bottom: 4px solid transparent;
            transition: border-bottom-color 0.8s;
          }
          .itemActive {
            border-bottom-color: #00923F;
          }
        }
        .button {
          width: 110px;
          height: 40px;
          background-color: #fff;
          border-radius: 20px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          color: #303030;
        }
      }

      &.foot {
        bottom: 0;
        .copyright {
          font-family: SourceSansPro-Bold;
          font-size: 12px;
          color: #303030;
          letter-spacing: 0.52px;
          line-height: 22px;
        }
        .arrow {
          margin: 0 auto;
          width: 20px;
          height: 10px;
          background: url("image/arrow_black.png") no-repeat 0 0;
          background-size: contain;
          animation: arrow 1s linear infinite;
        }
        .top {
          width: 50px;
          height: 50px;
          margin-left: 50px;
          background: url("image/top.png") no-repeat 0 0;
        }
      }
    }

    &.active {
      .item {
        color: #fff;
        background-color: transparent;
        .logo {
          background-image: url("image/logo.png");
        }
        .arrow {
          background-image: url("image/arrow_white.png");
        }
        .copyright {
          color: #fff;
        }
      }
    }

    .content {
      height: 100%;
      overflow: hidden;
    }
  }

</style>

<script>
  import Tabs from '../../components/common/tabs.vue'

  export default {
    data() {
      return {
        currentIndex: 1,
        tabsData: ['最新公告', '云资源', '帮助与支持', '关于我们'],
      }
    },

    computed: {
      active() {
        return {'active': this.currentIndex === 1}
      }
    },

    methods: {
      changeIndex(val) {
        this.currentIndex = val
      },

      toTabs(index) {
        this.$fullpage.moveTo(index+2)
      },
      toConsole() {
        this.$router.push({name: 'login'})
      },
      toTop() {
        this.$fullpage.moveTo(1)
      }
    }
  }
</script>