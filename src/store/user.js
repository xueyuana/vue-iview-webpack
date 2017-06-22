/* 保存我的资源数据*/

import {getCookie} from 'tools/cookieAction.js'
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

  actions: {//处理异步的方法
    getUserInfo({commit}, newDatas) {
      let id = JSON.parse(getCookie('userInfo')).id
      return new Promise((resolve, reject) => {
        Vue.http.get('api/user/users/' + id).then(response => {
          console.log('我是一只小毛驴', response)
          commit('getUserInfo', response.body.result.res)
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })

    }
  }
}
