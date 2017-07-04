/* 保存我的资源数据*/

import Cookie from 'js-cookie'
import Vue from 'vue'

export const userData = {
  // 存储状态值
  state: {
    userInfo: {}
  },
  // 状态值的改变方法,操作状态值
  mutations: {
    getUserInfo(state, val) {
      state.userInfo = val
    }
  },
  getters: {},

  actions: {  //处理异步的方法
    getUserInfo({commit}) {
      let id = Cookie.getJSON('userInfo').id
      return new Promise((resolve, reject) => {
        Vue.http.get('api/user/users/' + id).then(response => {
          if (response.body.code === 200) {
            commit('getUserInfo', response.body.result.res)
            resolve(response.body.result.res)
          }
        }).catch(error => {
          reject(error);
        })
      })

    }
  }
}
