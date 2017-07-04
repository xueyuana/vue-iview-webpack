/* 状态管理*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 导入面包屑导航的状态
import {breadcrumbData} from './breadcrumbData'
// 导入侧边导航的激活状态*/
import {openMenu} from './openMenu'
// 资源视图
import {subOpenMenu} from './subOpenMenu'
// 用户信息
import {userData} from './user'
// 动态路由
import {asyncRoutes} from './router'

export const store = new Vuex.Store({
  modules: {
    breadcrumbData,
    openMenu,
    subOpenMenu,
    userData,
    asyncRoutes
  }
});
