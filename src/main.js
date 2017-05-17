'use strict';

//导入vue
import Vue from 'vue';
import App from './App1.vue';

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

//导入初始化的css
import '../static/css/reset.css';

//导入组件
import login from './components/login/login.vue';
import home from './components/home/home.vue';

// 导入项目管理
import projectApplication from './components/common/projectApplication/projectapply.vue'



//创建路由对象
var vueRouters = new VueRouter({
    routes:[
        {path:'/',redirect:'login'}, //一开始就重定向到登录页面
        {name:'login',path:'/login',component:login},
        {name:'home',path:'/home',component:home,
            children: [
                // 管理控制台
                {name:'projectApplication',path:'/project_appliction',component:projectApplication}
            ]
        }
    ]
});


//创建Vue对象
new Vue({
    el: '#app',
    //在Vue实例上使用路由
    router:vueRouters,
    // //render:c=>c(App)//使用webpack,渲染App.vue这个根组件
    render: (function (createElement) {
        return createElement(App);
    })
});