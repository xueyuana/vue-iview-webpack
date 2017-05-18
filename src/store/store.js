/* 状态管理*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

/* 导入面包屑导航的状态*/
import { breadcrumbData } from './breadcrumbData.js';

export const store = new Vuex.Store({
    modules: {
        breadcrumbData:breadcrumbData
    }
});
