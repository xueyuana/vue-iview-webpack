<template>
  <div>
    <!--头部-->
    <div class="uop-header clearfix">
      <div class="logo fl">
        <a class="logo_icon" href="/"></a>
      </div>
      <div class="uop-title fl">
        <p>门头沟政务云资源管理平台</p>
      </div>
      <div class="user-info fr">
        <ul>
          <li class="username">
            用户：
            <span>{{userInfo.username}}</span>
          </li>
          <li class="department">
            所属部门：
            <span>{{userInfo.department}}</span>
          </li>
          <li @click="toLogOut">
            <a href="#">退出</a>
          </li>
        </ul>
      </div>
    </div>

    <!--主题内容-->
    <div class="uop-main">
      <div class="layout">
        <Row type="flex">
          <i-col span="4" class="layout-menu-left">
            <Menu v-if="role === 'user'" :active-name="$store.state.openMenu.activeItem.activeName"
                  :open-names="[$store.state.openMenu.activeItem.openNames]" theme="dark" width="auto" @on-select="go">
              <div class="layout-logo-left" @click="goConsole">
                管理控制台
              </div>
              <Submenu name="1">
                <template slot="title">
                  业务管理
                </template>
                <Menu-item name="11">部署实例</Menu-item>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  资源管理
                </template>
                <Menu-item name="21">资源申请</Menu-item>
                <Menu-item name="22">资源查询</Menu-item>
                <Menu-item name="23">我的资源</Menu-item>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  系统管理
                </template>
                <Menu-item name="31">用户管理</Menu-item>
                <Menu-item name="32">操作日志</Menu-item>
              </Submenu>
            </Menu>
            <Menu v-if="role === 'admin'" :active-name="$store.state.openMenu.activeItem.activeName"
                  :open-names="[$store.state.openMenu.activeItem.openNames]" theme="dark" width="auto" @on-select="go">
              <div class="layout-logo-left" @click="goConsole">
                管理控制台
              </div>
              <Submenu name="1">
                <template slot="title">
                  资源池
                </template>
                <Menu-item name="11">资源池管理</Menu-item>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  资源管理
                </template>
                <Menu-item name="21">镜像管理</Menu-item>
                <Menu-item name="22">虚拟机管理</Menu-item>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  资源审批
                </template>
                <Menu-item name="31">资源审批</Menu-item>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  系统管理
                </template>
                <Menu-item name="41">用户管理</Menu-item>
                <Menu-item name="42">操作日志</Menu-item>
              </Submenu>
            </Menu>
            <Menu v-if="role === 'approval'" :active-name="$store.state.openMenu.activeItem.activeName"
                  :open-names="[$store.state.openMenu.activeItem.openNames]" theme="dark" width="auto" @on-select="go">
              <div class="layout-logo-left" @click="goConsole">
                管理控制台
              </div>
              <Submenu name="1">
                <template slot="title">
                  资源管理
                </template>
                <Menu-item name="11">资源查询</Menu-item>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  系统管理
                </template>
                <Menu-item name="21">用户管理</Menu-item>
                <Menu-item name="22">操作日志</Menu-item>
              </Submenu>
            </Menu>
          </i-col>
          <i-col span="20" offset="4">
            <div class="layout-header">
              <Breadcrumb separator=">" v-if="$store.state.breadcrumbData.level.level_3">
                <Breadcrumb-item href="#">{{ $store.state.breadcrumbData.level.level_1 }}</Breadcrumb-item>
                <Breadcrumb-item href="/resource_view">{{ $store.state.breadcrumbData.level.level_2 }}</Breadcrumb-item>
                <Breadcrumb-item>{{ $store.state.breadcrumbData.level.level_3 }}</Breadcrumb-item>
              </Breadcrumb>
              <Breadcrumb separator=">" v-else>
                <Breadcrumb-item href="#">{{ $store.state.breadcrumbData.level.level_1 }}</Breadcrumb-item>
                <Breadcrumb-item>{{ $store.state.breadcrumbData.level.level_2 }}</Breadcrumb-item>
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

<style scoped>
  .uop-header {
    height: 60px;
    width: 100%;
    line-height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #ECECEC;
    box-sizing: border-box;
    position: fixed;
    background: #f5f7f9;
    z-index: 999;
    top: 0px;
  }

  .uop-header .logo {
    width: 100px;
    height: 60px;
  }

  .uop-header .logo_icon {
    display: block;
    width: 100%;
    height: 100%;
    background: url("../../static/logo.png") no-repeat 0 0;
    background-size: 100% 100%;
  }

  .uop-header .uop-title {
    margin-left: 60px;
    color: #3399FF;
    font-size: 18px;
  }

  .uop-header .user-info li {
    height: 100%;
    float: left;
    margin: 0 10px;
  }

  .uop-header .user-info li a {
    display: block;
    height: 100%;
  }

  /*主题内容布局*/
  .uop-main {
    width: 100%;
    margin-top: 60px;
  }

  .layout {
    /*border: 1px solid #d7dde4;*/
    /*background: #f5f7f9;*/
    position: relative;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    /*overflow: hidden;*/
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #464c5b;
    color: #fff;
    min-height: 800px;
    position: fixed;
  }

  .layout-header {
    margin-left: 15px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 100%;
    line-height: 50px;
    text-align: center;
    height: 50px;
    background: #5cadff;
    margin-bottom: 15px;
    color: #fff;
    cursor: pointer;
  }


</style>
<script>
  import {setStroage, getStroage, removeStroage} from 'tools/cookieAction.js';
  import common from '../../tools/common.js';
  import {userinfo} from '../../tools/user.js';

  export default {

    data () {
      return {
        // 保存用户名
        userInfo: {},
        role: ''
      }
    },
    mounted () {
      this.role = getStroage('role').role
//      this.getUserInfo();
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
          switch (this.role) {
            case 'user':
              this.$router.push({name: 'user_manageConsole'})
              break
            case 'admin':
              this.$router.push({name: 'admin_manageConsole'})
              break
            case 'approval':
              this.$router.push({name: 'approval_approvalQuery'})
              break
            default:
          }
        } else {
          this.$Message.error('没有权限，请重新登录')
        }
      },
      // 退出登录
      toLogOut() {
        removeStroage('userInfo');
        removeStroage('role');
        this.$router.push({name: 'login'});
      },

      // 导航跳转
      go (name) {
        if (this.role === 'user') {
          this.goUser(name)
        } else if (this.role === 'admin') {
          this.goAdmin(name)
        } else if (this.role === 'approval') {
          this.goApproval(name)
        } else {
          this.$Message.warning('没有权限，请重新登录')
        }
      },
      goUser(name) {
        switch (name) {
          case '11': //部署实例
            this.$router.push({name: 'user_deployExample'});
            break;

          case '21': //资源申请
            this.$router.push({name: 'user_resourceApplication'});
            break;
          case '22': //资源查询
            this.$router.push({name: 'user_resourceQuery'});
            break;
          case '23': //我的资源
            this.$router.push({name: 'user_myResource'});
            break;

          case '31': //用户管理
            this.$router.push({name: 'user_changePassword'});
            break;
          case '32': //操作日志
            this.$router.push({name: 'user_operationLog'});
            break;
          default:
        }
      },
      goAdmin(name) {
        switch (name) {
          case '11': //资源池管理
            this.$router.push({name: 'admin_poolManage'});
            break;

          case '21': //镜像管理
            this.$router.push({name: 'admin_mirrorManagement'});
            break;
          case '22': //虚拟机管理
            this.$router.push({name: 'admin_virtualManage'});
            break;

          case '31': //资源审批
            this.$router.push({name: 'admin_resourceApproval'});
            break;

          case '41': //用户管理
            this.$router.push({name: 'admin_userManage'});
            break;
          case '42': //操作日志
            this.$router.push({name: 'admin_operationLog'});
            break;
          default:
        }
      },
      goApproval(name) {
        switch (name) {
          case '11': //资源查询
            this.$router.push({name: 'approval_approvalQuery'});
            break;

          case '21': //用户管理
            this.$router.push({name: 'approval_changePassword'});
            break;
          case '22': //操作日志
            this.$router.push({name: 'approval_operationLog'});
            break;

          default:
        }
      }
    }

  }
</script>