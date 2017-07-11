'use strict'

  // 导入vue
import Vue from 'vue'
import App from './App.vue'


import iView from 'iview'                   // 导入iview 以及 iview的css
import './static/mytheme/index.less'
Vue.use(iView)


import {store} from './store/store.js'      // 引入vuex
import VueResource from 'tools/ajax.js'     // 引入vue-resource
import vueRouters from './router/index.js'  // 引入vue-router


import './static/css/reset.css'             // 导入初始化的css
import './static/css/common.less'

import './tools/fullpage/index.js'
import './tools/fullpage/fullpage.css'      // 引入fullpage
Vue.prototype.$fullpage = fullpage

// import Cookie from 'js-cookie'              // 引入cookie工具
// Vue.prototype.$Cookie = Cookie

vueRouters.beforeEach((to, from, next) => {

  if (to.path === '/' || to.path === '/notice') {
    next()
    return
  }

  let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}

  if (userInfo.id) {  // 如果Cookie中id存在，免登陆

    if (to.path === '/login') {
      next('/home')
    } else {
      if (Object.keys(store.state.userData.userInfo).length) {  // 拿到用户信息
        next()
      } else {      // 没有用户信息，获取用户信息并加载路由
        store.dispatch('getUserInfo').then(res => {
          store.dispatch('asyncRoutes', res.role).then(() => {
            vueRouters.addRoutes(store.state.asyncRoutes.asyncRoutes)
            next({ ...to })
          })
        })
      }
    }
  } else {          // 如果Cookie中id不存在，跳转登录
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

  render: (function (createElement) {
    return createElement(App)
  })
})