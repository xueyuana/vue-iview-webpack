'use strict'

// 导入vue
import Vue from 'vue'
import App from './App.vue'

// 导入状态池
import {store} from './store/store.js'

// 导入iview 以及 iview的css
import iView from 'iview'
Vue.use(iView)
import './static/mytheme/index.less'

// 引入vue-resource
import VueResource from 'tools/ajax.js'

// 导入初始化的css
import './static/css/reset.css'
import './static/css/common.less'

// 引入路由系统
import vueRouters from './router/index.js'

import {getCookie} from 'tools/cookieAction.js'

// 引入 fullpage
import './tools/fullpage/index.js'
import './tools/fullpage/fullpage.css'
Vue.prototype.$fullpage = fullpage

vueRouters.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/notice') {
    next()
    return
  }
  let id = getCookie('userInfo') ? JSON.parse(getCookie('userInfo')).id : ''

  if (id) {
    if (to.path === '/login') {
      next()
    } else {

      if (Object.keys(store.state.userData.userInfo).length) {
        let nav = {}
        let bread = {}
        let name = to.name
        bread.level_1 = '主页'
        switch (to.name) {
            // 用户
          case 'user_manageConsole':
            bread.level_2 = '管理控制台'
            break
          case 'user_deployExample':
            nav.openNames = '1'
            nav.activeName = '11'
            bread.level_2 = '部署实例'
            break
          case 'user_resourceApplication':
            nav.openNames = '2'
            nav.activeName = '21'
            bread.level_2 = '资源申请'
            break
          case 'user_resourceQuery':
            nav.openNames = '2'
            nav.activeName = '22'
            bread.level_2 = '资源查询'
            break
          case 'user_myResource':
            nav.openNames = '2'
            nav.activeName = '23'
            bread.level_2 = '我的资源'
            break
          case 'user_changePassword':
            nav.openNames = '3'
            nav.activeName = '31'
            bread.level_2 = '用户管理'
            break
          case 'user_operationLog':
            nav.openNames = '3'
            nav.activeName = '32'
            bread.level_2 = '操作日志'
            break
            // 管理员
          case 'admin_manageConsole':
            bread.level_2 = '管理控制台'
            break
          case 'admin_poolManage':
            nav.openNames = '1'
            nav.activeName = '11'
            bread.level_2 = '部署区域管理'
            break
          case 'admin_poolDetails':
            bread.level_2 = '部署区域详情'
            break
          case 'admin_mirrorManagement':
            nav.openNames = '2'
            nav.activeName = '21'
            bread.level_2 = '镜像管理'
            break
          case 'admin_virtualManage':
            nav.openNames = '2'
            nav.activeName = '22'
            bread.level_2 = '虚拟机管理'
            break
          case 'admin_deployManage':
            nav.openNames = '2'
            nav.activeName = '23'
            bread.level_2 = '部署实例管理'
            break
          case 'admin_deployDetails':
            bread.level_2 = '部署实例详情'
            break
          case 'admin_publicNetIp':
            nav.openNames = '2'
            nav.activeName = '24'
            bread.level_2 = '公网IP管理'
            break
          case 'admin_resourceApproval':
            nav.openNames = '3'
            nav.activeName = '31'
            bread.level_2 = '资源审批'
            break
          case 'admin_userManage':
            nav.openNames = '4'
            nav.activeName = '41'
            bread.level_2 = '用户管理'
            break
          case 'admin_operationLog':
            nav.openNames = '4'
            nav.activeName = '42'
            bread.level_2 = '操作日志'
            break
            // 行政审批
          case 'approval_approvalQuery':
            nav.openNames = '1'
            nav.activeName = '11'
            bread.level_2 = '资源查询'
            break
          case 'approval_resourceDetails':
            bread.level_2 = '部署区域详情'
            break
          case 'approval_changePassword':
            nav.openNames = '2'
            nav.activeName = '21'
            bread.level_2 = '用户管理'
            break
          case 'approval_operationLog':
            nav.openNames = '2'
            nav.activeName = '22'
            bread.level_2 = '操作日志'
            break
          default:
        }
        store.commit('getActiveItem', nav)
        store.commit('getLevel', bread)
        next()
      } else {
        store.dispatch('getUserInfo').then(res => {
          let nav = {}
          let bread = {}
          let name = to.name
          bread.level_1 = '主页'
          switch (to.name) {
            // 用户
            case 'user_manageConsole':
              bread.level_2 = '管理控制台'
              break
            case 'user_deployExample':
              nav.openNames = '1'
              nav.activeName = '11'
              bread.level_2 = '部署实例'
              break
            case 'user_resourceApplication':
              nav.openNames = '2'
              nav.activeName = '21'
              bread.level_2 = '资源申请'
              break
            case 'user_resourceQuery':
              nav.openNames = '2'
              nav.activeName = '22'
              bread.level_2 = '资源查询'
              break
            case 'user_myResource':
              nav.openNames = '2'
              nav.activeName = '23'
              bread.level_2 = '我的资源'
              break
            case 'user_changePassword':
              nav.openNames = '3'
              nav.activeName = '31'
              bread.level_2 = '用户管理'
              break
            case 'user_operationLog':
              nav.openNames = '3'
              nav.activeName = '32'
              bread.level_2 = '操作日志'
              break
            // 管理员
            case 'admin_manageConsole':
              bread.level_2 = '管理控制台'
              break
            case 'admin_poolManage':
              nav.openNames = '1'
              nav.activeName = '11'
              bread.level_2 = '部署区域管理'
              break
            case 'admin_poolDetails':
              bread.level_2 = '部署区域详情'
              break
            case 'admin_mirrorManagement':
              nav.openNames = '2'
              nav.activeName = '21'
              bread.level_2 = '镜像管理'
              break
            case 'admin_virtualManage':
              nav.openNames = '2'
              nav.activeName = '22'
              bread.level_2 = '虚拟机管理'
              break
            case 'admin_deployManage':
              nav.openNames = '2'
              nav.activeName = '23'
              bread.level_2 = '部署实例管理'
              break
            case 'admin_publicNetIp':
              nav.openNames = '2'
              nav.activeName = '24'
              bread.level_2 = '公网IP管理'
              break
            case 'admin_resourceApproval':
              nav.openNames = '3'
              nav.activeName = '31'
              bread.level_2 = '资源审批'
              break
            case 'admin_userManage':
              nav.openNames = '4'
              nav.activeName = '41'
              bread.level_2 = '用户管理'
              break
            case 'admin_operationLog':
              nav.openNames = '4'
              nav.activeName = '42'
              bread.level_2 = '操作日志'
              break
            // 行政审批
            case 'approval_approvalQuery':
              nav.openNames = '1'
              nav.activeName = '11'
              bread.level_2 = '资源查询'
              break
            case 'approval_resourceDetails':
              bread.level_2 = '部署区域详情'
              break
            case 'approval_changePassword':
              nav.openNames = '2'
              nav.activeName = '21'
              bread.level_2 = '用户管理'
              break
            case 'approval_operationLog':
              nav.openNames = '2'
              nav.activeName = '22'
              bread.level_2 = '操作日志'
              break
            default:
          }
          store.commit('getActiveItem', nav)
          store.commit('getLevel', bread)
          next()
        })
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }

})


//创建Vue对象
new Vue({
  el: '#app',
  // 使用状态池
  store,
  //在Vue实例上使用路由
  router: vueRouters,
  //render:c=>c(App)//使用webpack,渲染App.vue这个根组件
  render: (function (createElement) {
    return createElement(App)
  })
})