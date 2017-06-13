'use strict';

//导入vue
import Vue from 'vue';
import App from './App.vue';

//导入vuex 状态管理
import Vuex from 'vuex';
Vue.use(Vuex);

//导入iview
import iView from 'iview';
//使用iview的css
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

// 导入字体图标库
import 'font-awesome/less/font-awesome.less';
//导入初始化的css
import '../static/css/reset.css';

// 导入echarts2
// import echarts from 'echarts2';
// Vue.use(echarts);

// 导入视图界面
import page from './views/page/page.vue'                    // 首页
import login from './views/common/login.vue'                // 登录
import home from './views/common/home.vue'                  // Home页

import user_manageConsole from './views/common/manageConsole.vue'                               // 用户 > 管理控制台
import user_deployExample from './views/user/businessManage/deployExamples.vue'                 // 用户 > 部署实例
import user_resourceApplication from './views/user/resourceManage/resourceApplication.vue'      // 用户 > 资源申请
import user_resourceQuery from './views/user/resourceManage/resourceQuery.vue'                  // 用户 > 资源查询
import user_myResource from './views/common/myResource.vue'                                     // 用户 > 我的资源
import user_changePassword from './views/common/changePassword.vue'                             // 用户 > 用户管理（修改密码）
import user_operationLog from './views/common/operationLog.vue'                                 // 用户 > 操作日志

import admin_manageConsole from './views/admin/manageConsole.vue'                               // 管理员 > 管理控制台
import admin_poolManage from './views/admin/resourcePool/poolManage.vue'                        // 管理员 > 资源池管理
import admin_mirrorManagement from './views/admin/resourceManage/mirrorManage.vue'              // 管理员 > 镜像管理
import admin_virtualManage from './views/common/myResource.vue'                                 // 管理员 > 虚拟机管理
import admin_resourceApproval from './views/admin/resourceApproval/resourceApproval.vue'        // 管理员 > 资源审批
import admin_userManage from './views/admin/systemManage/userManage.vue'                        // 管理员 > 用户管理
import admin_operationLog from './views/common/operationLog.vue'                                // 管理员 > 操作日志

import approval_approvalQuery from './views/approval/approvalManage/approvalQuery.vue'          // 行政审批 > 资源查询（审批查询）
import approval_resourceDetails from './views/common/resourceDetails.vue'                         // 行政审批 > 行政审批页面（资源详情）
import approval_changePassword from './views/common/changePassword.vue'                         // 行政审批 > 用户管理（修改密码）
import approval_operationLog from './views/common/operationLog.vue'                             // 行政审批 > 操作日志

//创建路由对象
var vueRouters = new VueRouter({
    // 滚动行为在history模式小有效
    mode: 'history',
    routes: [
        {path: '/', redirect: '/home', component: home},
        {name: 'login', path: '/login', component: login},

        {
            name: 'home', path: '/home', component: home,
            children: [
                // 用户
                {name: 'user_manageConsole', path: 'user_manageConsole', component: user_manageConsole},
                {name: 'user_deployExample', path: 'user_deployExample', component: user_deployExample},
                {name: 'user_resourceApplication', path: 'user_resourceApplication', component: user_resourceApplication},
                {name: 'user_resourceQuery', path: 'user_resourceQuery', component: user_resourceQuery},
                {name: 'user_myResource', path: 'user_myResource', component: user_myResource},
                {name: 'user_changePassword', path: 'user_changePassword', component: user_changePassword},
                {name: 'user_operationLog', path: 'user_operationLog', component: user_operationLog},
            ]
        }
    ],

    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (to.hash) {
                return { anchor: true }
            }else  {
                return { x: 0, y: 0 }
            }
        }
    }
});

// 导入状态池
import {store} from './store/store.js';


vueRouters.beforeEach((to, from, next) => {
    let nav = {};
    let bread = {};
    bread.level_1 = '主页'
    switch (to.name) {
        // 管理控制台 > 普通用户
        case 'managementConsole':
            bread.level_2 = '管理控制台'
            break
        // 管理控制台 > 管理员账户
        case 'adminConsole':
            bread.level_2 = '管理控制台'
            break
        // 部署单元管理
        case 'projectApplication':
            nav.openNames = '1'
            nav.activeName = '11'
            bread.level_2 = '创建部署单元'
            break
        case 'pro_applicationHistory':
            nav.openNames = '1'
            nav.activeName = '12'
            bread.level_2 = '部署单元查询'
            break
        // 资源管理
        case 'resourceApplication':
            nav.openNames = '2'
            nav.activeName = '21'
            bread.level_2 = '部署实例申请'
            break

        case 'res_applicationHistory':
            nav.openNames = '2'
            nav.activeName = '23'
            bread.level_2 = '部署实例列表'
            break
        case 'res_applicationCheck':
            bread.level_2 = '部署实例审批'
            break
        // 持续交付
        case 'applicationDeployment':
            nav.openNames = '3'
            nav.activeName = '31'
            bread.level_2 = '应用部署'
            break
        case 'deployHistory':
            nav.openNames = '3'
            nav.activeName = '32'
            bread.level_2 = '部署历史'
            break
        // 工作台
        case 'myWorkbench_ordinary':
            nav.openNames = '4'
            nav.activeName = '41'
            bread.level_2 = '我的工作台'
            break
        case 'myWorkbench_admin':
            nav.openNames = '4'
            nav.activeName = '41'
            bread.level_2 = '我的工作台'
            break
        case 'myResource':
            nav.openNames = '4'
            nav.activeName = '42'
            bread.level_2 = '我的资源'
            break
        case 'myApplication':
            nav.openNames = '2'
            nav.activeName = '44'
            bread.level_2 = '我的申请'
            break
        case 'resourceView':
            nav.openNames = '4'
            nav.activeName = '43'
            bread.level_2 = '资源视图'
            break
        // 权限管理
        case 'addAuthority':
            nav.openNames = '5'
            nav.activeName = '51'
            bread.level_2 = '添加权限'
            break
        case 'resourceTree':
            nav.openNames = '4'
            nav.activeName = '43'
            bread.level_2 = '资源视图'
            break

        default:
            break
    }
    store.commit('getActiveItem', nav)
    store.commit('getLevel', bread)

    next();
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
        return createElement(App);
    })
});