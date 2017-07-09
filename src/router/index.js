/**
 * @Author   : Schoilar
 * @Data     : 2017-06-15  10:16
 * @Describe :
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import page from 'views/page/index.vue'                    // 首页
import main from 'views/page/main.vue'                     // 首屏
import notice from 'views/page/notice.vue'                 // 公告

import login from 'views/common/login.vue'                 // 登录
import home from 'views/common/home.vue'                   // Home页

import err404 from 'views/error/404.vue'                    // 404界面

import user_manageConsole from 'views/user/manageConsole.vue'                                 // 用户 > 管理控制台
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
import admin_virtualManage from 'views/common/myResource.vue'                                 // 管理员 > 虚拟机管理
import admin_deployManage from 'views/admin/resourceManage/deployManage.vue'                  // 管理员 > 部署实例管理
import admin_publicNetIp from 'views/admin/resourceManage/publicNetIp.vue'                    // 管理员 > 公网IP管理
import admin_resourceApproval from 'views/admin/resourceApproval/resourceApproval.vue'        // 管理员 > 资源审批
import admin_resourceDetails from 'views/common/resourceDetails.vue'                          // 管理员 >（资源详情）
import admin_userManage from 'views/admin/systemManage/userManage.vue'                        // 管理员 > 用户管理
import admin_operationLog from 'views/common/operationLog.vue'                                // 管理员 > 操作日志
import admin_deployDetails from 'views/admin/resourceManage/deployDetails.vue'                // 管理员 > 部署实例详情

import approval_approvalQuery from 'views/approval/approvalManage/approvalQuery.vue'          // 行政审批 > 资源查询（审批查询）
import approval_resourceDetails from 'views/common/resourceDetails.vue'                       // 行政审批 > 行政审批页面（资源详情）
import approval_changePassword from 'views/common/changePassword.vue'                         // 行政审批 > 用户管理（修改密码）
import approval_operationLog from 'views/common/operationLog.vue'                             // 行政审批 > 操作日志


  // 创建公共路由
var routes = [
  {path: '/', component: page,
    children: [
      {path: '', component: main},
      {name: 'notice', path: 'notice', component: notice}
    ]
  },
  {name: 'login', path: '/login', component: login},
  {path: '/404', component: err404},
]

export const userRoutes = [
  {
    name: '管理控制台', path: '/home', redirect: '/home/user_manageConsole', component: home,
    children: [
      {path: 'user_manageConsole', component: user_manageConsole}
    ]
  },
  {
    name: '业务管理', path: '/home', component: home, icon: 'icon-business',
    children: [
      {name: '部署实例', path: 'user_deployExample', component: user_deployExample}
    ]
  },
  {
    name: '资源管理', path: '/home', component: home, icon: 'icon-resource',
    children: [
      {name: '资源申请', path: 'user_resourceApplication', component: user_resourceApplication},
      {name: '资源查询', path: 'user_resourceQuery', component: user_resourceQuery},
      {name: '我的资源', path: 'user_myResource', component: user_myResource}
    ]
  },
  {
    name: '系统管理', path: '/home', component: home, icon: 'icon-system',
    children: [
      {name: '用户管理', path: 'user_changePassword', component: user_changePassword},
      {name: '操作日志', path: 'user_operationLog', component: user_operationLog}
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export const adminRoutes = [
  {
    name: '管理控制台', path: '/home', redirect: '/home/admin_manageConsole', component: home,
    children: [
      {path: 'admin_manageConsole', component: admin_manageConsole}
    ]
  },
  {
    name: '部署区域', path: '/home', component: home, icon: 'icon-resource-chi',
    children: [
      {name: '部署区域管理', path: 'admin_poolManage', component: admin_poolManage},
      {name: '部署区域详情', path: 'admin_poolDetails', component: admin_poolDetails, hidden: true}
    ]
  },
  {
    name: '资源管理', path: '/home', component: home, icon: 'icon-resource',
    children: [
      {name: '操作系统管理', path: 'admin_mirrorManagement', component: admin_mirrorManagement},
      {name: '虚拟机管理', path: 'admin_virtualManage', component: admin_virtualManage},
      {name: '部署实例管理', path: 'admin_deployManage', component: admin_deployManage},
      {name: '部署实例详情', path: 'admin_deployDetails', component: admin_deployDetails, hidden: true},
      {name: '公网IP管理', path: 'admin_publicNetIp', component: admin_publicNetIp}
    ]
  },
  {
    name: '资源审批', path: '/home', component: home, icon: 'icon-approval',
    children: [
      {name: '资源审批管理', path: 'admin_resourceApproval', component: admin_resourceApproval},
      {name: '资源详情', path: 'admin_resourceDetails', component: admin_resourceDetails, hidden: true}
    ]
  },
  {
    name: '系统管理', path: '/home', component: home, icon: 'icon-system',
    children: [
      {name: '用户管理', path: 'admin_userManage', component: admin_userManage},
      {name: '操作日志', path: 'admin_operationLog', component: admin_operationLog}
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export const leaderRoutes = [
  {
    name: '管理控制台', path: '/home', redirect: '/home/approval_approvalQuery', component: home,
    children: [
      {path: 'approval_approvalQuery', component: approval_approvalQuery}
    ]
  },
  {
    name: '资源管理', path: '/home', component: home, icon: 'icon-resource',
    children: [
      {name: '资源查询', path: 'approval_approvalQuery', component: approval_approvalQuery},
      {name: '资源详情', path: 'approval_resourceDetails', component: approval_resourceDetails, hidden: true}
    ]
  },
  {
    name: '系统管理', path: '/home', component: home, icon: 'icon-system',
    children: [
      {name: '用户管理', path: 'approval_changePassword', component: approval_changePassword},
      {name: '操作日志', path: 'approval_operationLog', component: approval_operationLog}
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]



export default new VueRouter({
  routes: routes
})
