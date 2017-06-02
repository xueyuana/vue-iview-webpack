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
import echarts from 'echarts2';
Vue.use(echarts);

//导入组件
import login from './components/login/login.vue';
import home from './components/home/home.vue';

// 导入管理控制台
import managementConsole from './components/common/managementConsole/ordinaryConsole.vue';
import adminConsole from './components/common/managementConsole/adminConsole.vue';

// 导入项目管理
import projectApplication from './components/common/projectManagement/projectApplication/createProject.vue';
import pro_applicationHistory from './components/common/projectManagement/applicationHistory/applicationHistory.vue';

// 资源管理
import resourceApplication from './components/common/resourceManagement/resourceApplication/resourceApplication.vue';
import res_applicationHistory from './components/common/resourceManagement/applicationHistory/applicationHistory.vue';
//资源审批
import res_applicationCheck from './components/common/resourceManagement/resourceApplication/resourceCheck.vue';
// 部署管理
import deployment from './components/common/deployManagement/applicationDeployment/deployment.vue';
import applicationDeployment from './components/common/deployManagement/applicationDeployment/applicationDeployment.vue';
import deployHistory from 'components/common/deployManagement/deployHistory/deployHistory.vue';

//工作台
import processList from './components/common/workbench/processList/processList.vue';
import myWorkbench from './components/common/workbench/myWorkbench/myWorkbranch.vue';
import myResource from './components/common/workbench/myResource/myResource1.vue';
import resourceView from './components/common/workbench/resourceView/resourceView.vue';
// 导入资源架构图子组件
import resourceTree from './components/common/workbench/resourceView/subcomponent/resourceTree.vue';

//权限管理
import addAuthority from './components/common/authorityManagement/addAuthority.vue';


//创建路由对象
var vueRouters = new VueRouter({
    routes:[
        {path:'/',redirect:'login'}, //一开始就重定向到登录页面
        {name:'login',path:'/login',component:login},

        {name:'home',path:'/home',component:home,
            children: [
                // 管理控制台
                // 普通用户
                {name:'managementConsole',path:'/management_console',component:managementConsole},
                //管理员账户
                {name:'adminConsole',path:'/admin_console',component:adminConsole},
                // 项目管理
                {name:'projectApplication',path:'/project_application',component:projectApplication},
                {name:'pro_applicationHistory',path:'/pro_application_history',component:pro_applicationHistory},
                // 资源管理
                {name:'resourceApplication',path:'/resource_application',query: { id: 'ss' },component:resourceApplication},
                {name:'res_applicationHistory',path:'/res_application_history',component:res_applicationHistory},
                // 资源审批
                {name:'res_applicationCheck',path:'/res_applicationCheck',component:res_applicationCheck},

                // 部署管理
                {name:'deployment',path:'/deployment',component:deployment},
                {name:'applicationDeployment',path:'/application_deployment',component:applicationDeployment},
                {name:'deployHistory',path:'/deploy_history',component:deployHistory},
                // 工作台
                {name:'processList',path:'/process_list',component:processList},

                {name:'myWorkbench_ordinary',path:'/my_workbench',component:managementConsole}, // 加载普通用户管理控制台组件
                {name:'myWorkbench_admin',path:'/my_workbench',component:adminConsole}, // 加载管理员管理控制台组件

                {name:'myResource',path:'/my_resource',component:myResource},
                {name:'resourceView',path:'/resource_view',component:resourceView,
                    children:[
                        {name: 'resourceTree',path:'/resource_view/tree_map/:resource_id',component:resourceTree}
                        ]
                },
                // 权限管理
                {name:'addAuthority',path:'/add_authority',component:addAuthority}
            ]
        }
    ]
});

// 导入状态池
import {store} from './store/store.js';

vueRouters.beforeEach((to, from, next) => {
  let nav = {}
  let bread = {}
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
      bread.level_2 = '资源申请'
      break
    case 'res_applicationHistory':
      nav.openNames = '2'
      nav.activeName = '22'
      bread.level_2 = '申请历史'
      break
    case 'res_applicationCheck':
      bread.level_2 = '资源审批'
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
    default:
        break
  }
  store.commit('getActiveItem', nav)
  store.commit('getLevel', bread)
  next()
})


//创建Vue对象
new Vue({
    el: '#app',
    // 使用状态池
    store,
    //在Vue实例上使用路由
    router:vueRouters,
    //render:c=>c(App)//使用webpack,渲染App.vue这个根组件
    render: (function (createElement) {
        return createElement(App);
    })
});