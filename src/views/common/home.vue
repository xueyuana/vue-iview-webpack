<template>
  <div class="home">
    <!--头部-->
    <div class="uop-header clearfix">
      <div class="logo fl">
        <a class="logo_icon" href="/"></a>
      </div>
      <div class="user-info fr">
        <ul>
          <li class="username">
            用户：
            <span>{{$store.state.userData.userInfo.username }}</span>
          </li>
          <li class="department">
            所属部门：
            <span>{{$store.state.userData.userInfo.department}}</span>
          </li>
          <li @click="toLogOut">
            <a href="javascript:void(0);" class="user-logout"><i class="ivu-icon icon-logout"></i>退出</a>
          </li>
        </ul>
      </div>
    </div>

    <!--主题内容-->
    <div class="uop-main">
      <div class="layout">
        <Row type="flex">

          <i-col span="4" class="layout-menu-left">
            <Menu ref="left_menu" :open-names="[$route.matched[0].name]" :active-name="$route.path"
                  theme="dark" width="auto" accordion>

              <template v-for="(item, index) in asyncRouters">
                <div v-if="!index" class="layout-logo-left" @click="goConsole">{{item.name}}</div>

                <Submenu v-else-if="!item.hidden" :name="item.name">
                  <template slot="title">
                    <i :class="'ivu-icon ' + item.icon"></i>{{item.name}}


                  </template>
                  <router-link v-for="child in item.children" :key="child.path" :to="item.path+'/'+child.path"
                               v-if="!child.hidden">
                    <Menu-item :name="item.path+'/'+child.path">
                      {{child.name}}
                    </Menu-item>
                  </router-link>
                </Submenu>
              </template>

            </Menu>
          </i-col>

          <i-col span="20" offset="4">
            <div class="layout-header">
              <Breadcrumb separator=">">
                <Breadcrumb-item href="/home">主页</Breadcrumb-item>
                <Breadcrumb-item v-for="item in $route.matched" v-if="item.name" :href="item.path">{{item.name}}

                </Breadcrumb-item>
              </Breadcrumb>
            </div>
            <div class="layout-content">
              <div class="layout-content-main">
                <!--被匹配的路由返回的组件-->
                <router-view></router-view>
              </div>
            </div>
          </i-col>
        </Row>
      </div>
    </div>

  </div>

</template>

<style lang="less" scoped>
  @import "../../static/mytheme/index.less";

  .home {
    width: 100%;
    height: 100%;
  }

  .uop-header {
    height: 80px;
    width: 100%;
    line-height: 80px;
    padding: 0 30px;
    border-bottom: 1px solid #ECECEC;
    box-sizing: border-box;
    position: fixed;
    background: #fff;
    z-index: 999;
    top: 0px;
  }

  .uop-header .logo {
    width: 356px;
    height: 28px;
    margin-top: 26px;
  }

  .uop-header .logo_icon {
    display: block;
    width: 100%;
    height: 100%;
    background: url("../../static/logo.png") no-repeat 0 0;
    background-size: 100% 100%;
  }

  .uop-header .uop-title {
    margin-left: 8px;
    font-size: 25px;
    color: #2B3642;
    /*font-size: 20px;*/
    /*color: #2B3642;*/
  }

  .uop-header .user-info li {
    height: 100%;
    float: left;
    font-size: 16px;
    color: #777E8C;
    margin: 0 10px;
  }

  .uop-header .user-info li a {
    display: block;
    height: 100%;
    color: #777E8C;
  }

  .uop-header .user-info li .ivu-icon {
    vertical-align: middle;
    width: 26px;
    height: 26px;
  }

  .uop-header .user-info li .icon-logout {
    /*margin-right:6px;*/
    background: url("../../static/icon-logout.png") no-repeat;
    background-size: cover;
  }

  /*主题内容布局*/
  .uop-main {
    width: 100%;
    height: 100%;
    padding-top: 80px;
  }

  .layout {
    background: #F0F5FA;
    height: 100%;
    position: relative;
    overflow: auto;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 500px;
    margin: 0 30px 30px 30px;
    /*overflow: hidden;*/
    background: #fff;
    /*border-radius: 4px;*/
  }

  .layout-content-main {
    padding: 30px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    /*#1E7BE2  #D3371B 100%@menu-dark-active-bg*/
    background: @menu-dark-active-bg;
    color: #fff;
    font-size: 16px;
    min-height: 800px;
    position: fixed;
  }

  .layout-menu-left .ivu-menu-submenu-title {

  }

  .layout-menu-left .ivu-icon {
    vertical-align: bottom;
    width: 20px;
    height: 20px;
  }

  .layout-menu-left .icon-system {
    background: url("../../static/icon-system.png") no-repeat;
    background-size: cover;
  }

  .layout-menu-left .icon-business {
    background: url("../../static/icon-business.png") no-repeat;
    background-size: cover;
  }

  .layout-menu-left .icon-resource {
    background: url("../../static/icon-resource.png") no-repeat;
    background-size: cover;
  }

  .layout-menu-left .icon-resource {
    background: url("../../static/icon-resource.png") no-repeat;
    background-size: cover;
  }

  .layout-menu-left .icon-approval {
    background: url("../../static/icon-approval.png") no-repeat;
    background-size: cover;
  }

  .layout-menu-left .icon-resource-chi {
    background: url("../../static/icon-resource-chi.png") no-repeat;
    background-size: cover;
  }

  .layout-header {
    margin-left: 30px;
    height: 76px;
    line-height: 76px;
    font-size: 16px;
    color: #777E8C;
  }

  .layout-header .ivu-breadcrumb > span:last-child {
    font-weight: normal;
  }

  .layout-logo-left {
    width: 100%;
    line-height: 50px;
    text-align: center;
    height: 50px;
    /*#5cadff #C61E00 #0966CD @menu-dark-active-bg*/
    background: @primary-color;
    margin-bottom: 15px;
    color: #fff;
    cursor: pointer;
  }


</style>
<script>
  import {mapState} from 'vuex'

  export default {

    data () {
      return {
        // 保存用户名
        userInfo: {},
        role: ''
      }
    },

    created() {
      this.userInfo = this.$store.state.userData.userInfo
      this.role = this.userInfo.role
    },

    computed: {
      ...mapState({
        asyncRouters: state => state.asyncRoutes.asyncRoutes
      })
    },

    watch: {
      '$route': function (newVal) {
        this.$nextTick(() => {
          this.$refs.left_menu.updateOpened()
        })
      }
    },

    methods: {
      // 获取用户名
      getUserInfo () {
        this.userInfo = getStroage('userInfo');
        console.log('用户信息', this.userInfo)
      },
      // 跳转到管理控制台
      goConsole () {
        // 根据不同身份跳转不同界面
        if (this.role) {
          this.$router.push({path: '/home'})
        } else {
          this.$Message.error('没有权限，请重新登录')
        }
      },
      // 退出登录
      toLogOut() {
//        this.$Cookie.remove('userInfo')
        sessionStorage.removeItem('userInfo')
        this.$store.commit('getUserInfo', {})
        console.log('我退出了，清空cookie 和 vuex')

        location.reload()
      }
    }

  }
</script>