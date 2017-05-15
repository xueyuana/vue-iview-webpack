'use strict';

//导入vue
import Vue from 'vue';
import App from './App.vue';

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






//创建Vue对象
new Vue({
    el: '#app',
    // //render:c=>c(App)//使用webpack,渲染App.vue这个根组件
    render: (function (createElement) {
        return createElement(App);
    })
});