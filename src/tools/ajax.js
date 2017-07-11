/**
 * @Author   : Schoilar
 * @Data     : 2017-06-19  21:06
 * @Describe : 引入vue-resource
 */

import Vue from 'vue'
import VueResource from 'vue-resource'
import {store} from './../store/store.js'      // 引入vuex
Vue.use(VueResource)

Vue.http.options.root = 'http://mpc-test.syswin.com'

Vue.http.interceptors.push(function (request, next) {
    if(request.method !="GET"){//排除GET请求
        request.body['user_id']=store.state.userData.userInfo.id;
        request.body['user_name']=store.state.userData.userInfo.username;
    }
    next(function (response) {
        return response
    })
})

export default VueResource