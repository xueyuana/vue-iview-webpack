/* 状态管理*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

/* 导入面包屑导航的状态*/
import { breadcrumbData } from './breadcrumbData.js';
/* 导入项目信息列表 */
import { projectInfo } from './projectList.js';
/* 导入侧边导航的激活状态*/
import { openMenu } from './openMenu.js';

export const store = new Vuex.Store({
    modules: {
        breadcrumbData:breadcrumbData,
        projectInfo:projectInfo,
        openMenu:openMenu
    }
});
