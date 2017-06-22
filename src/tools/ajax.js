/**
 * @Author   : Schoilar
 * @Data     : 2017-06-19  21:06
 * @Describe : 引入vue-resource
 */

import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)


Vue.http.options.root = 'http://mpc-test.syswin.com'

export default VueResource