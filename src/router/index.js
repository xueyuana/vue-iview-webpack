/**
 * @Author   : Schoilar
 * @Data     : 2017-06-15  10:16
 * @Describe :
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import page from 'views/page/index.vue'                    // 首页
import login from 'views/common/login.vue'                // 登录
import home from 'views/common/home.vue'                  // Home页

import user_manageConsole from 'views/user/manageConsole.vue'                                   // 用户 > 管理控制台
import user_deployExample from 'views/user/businessManage/deployExamples.vue'                 // 用户 > 部署实例
import user_resourceApplication from 'views/user/resourceManage/resourceApplication.vue'      // 用户 > 资源申请
import user_resourceQuery from 'views/user/resourceManage/resourceQuery.vue'                  // 用户 > 资源查询
import user_myResource from 'views/common/myResource.vue'                                     // 用户 > 我的资源
import user_changePassword from 'views/common/changePassword.vue'                             // 用户 > 用户管理（修改密码）
import user_operationLog from 'views/common/operationLog.vue'                                 // 用户 > 操作日志

import admin_manageConsole from 'views/admin/manageConsole.vue'                               // 管理员 > 管理控制台
import admin_poolManage from 'views/admin/resourcePool/poolManage.vue'                        // 管理员 > 资源池管理
import admin_poolDetails from 'views/admin/resourcePool/poolDetail.vue'                       // 管理员 > 资源池详情
import admin_mirrorManagement from 'views/admin/resourceManage/mirrorManage.vue'              // 管理员 > 镜像管理
import admin_virtualManage from 'views/admin/resourceManage/virtualManage.vue'                // 管理员 > 虚拟机管理
import admin_resourceApproval from 'views/admin/resourceApproval/resourceApproval.vue'        // 管理员 > 资源审批
import admin_userManage from 'views/admin/systemManage/userManage.vue'                        // 管理员 > 用户管理
import admin_operationLog from 'views/common/operationLog.vue'                                // 管理员 > 操作日志
import admin_deployDetails from 'views/admin/resourceManage/deployDetails.vue'                // 管理员 > 虚拟机管理

import approval_approvalQuery from 'views/approval/approvalManage/approvalQuery.vue'          // 行政审批 > 资源查询（审批查询）
import approval_resourceDetails from 'views/common/resourceDetails.vue'                       // 行政审批 > 行政审批页面（资源详情）
import approval_changePassword from 'views/common/changePassword.vue'                         // 行政审批 > 用户管理（修改密码）
import approval_operationLog from 'views/common/operationLog.vue'                             // 行政审批 > 操作日志


// 创建路由对象
var routes = [
  {name: 'page', path: '/', component: page},
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
      // 管理员
      {name: 'admin_manageConsole', path: 'admin_manageConsole', component: admin_manageConsole},
      {name: 'admin_poolManage', path: 'admin_poolManage', component: admin_poolManage},
      {name: 'admin_poolDetails', path: 'admin_poolDetails', component: admin_poolDetails},
      {name: 'admin_mirrorManagement', path: 'admin_mirrorManagement', component: admin_mirrorManagement},
      {name: 'admin_virtualManage', path: 'admin_virtualManage', component: admin_virtualManage},
      {name: 'admin_resourceApproval', path: 'admin_resourceApproval', component: admin_resourceApproval},
      {name: 'admin_userManage', path: 'admin_userManage', component: admin_userManage},
      {name: 'admin_operationLog', path: 'admin_operationLog', component: admin_operationLog},
      {name: 'admin_deployDetails', path: 'admin_deployDetails', component: admin_deployDetails},
      // 行政审批
      {name: 'approval_approvalQuery', path: 'approval_approvalQuery', component: approval_approvalQuery},
      {name: 'approval_resourceDetails', path: 'approval_resourceDetails', component: approval_resourceDetails},
      {name: 'approval_changePassword', path: 'approval_changePassword', component: approval_changePassword},
      {name: 'approval_operationLog', path: 'approval_operationLog', component: approval_operationLog}
    ]
  }
]


export default new VueRouter({
  routes: routes
})
