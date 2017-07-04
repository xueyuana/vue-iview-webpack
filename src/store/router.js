/* 根据用户权限动态加载路由 */

import {userRoutes, adminRoutes, leaderRoutes} from '../router/index'

export const asyncRoutes = {

  state: {        // 存储状态值
    asyncRoutes: []
  },

  mutations: {    // 状态值的改变方法,操作状态值
    asyncRoutes(state, val) {
      state.asyncRoutes = val
    }
  },

  getters: {},

  actions: {      //处理异步的方法
    asyncRoutes({commit}, role) {
      return new Promise((resolve, reject) => {
        switch (role) {
          case 'user':
            commit('asyncRoutes', userRoutes)
            break
          case 'admin':
            commit('asyncRoutes', adminRoutes)
            break
          case 'leader':
            commit('asyncRoutes', leaderRoutes)
            break
          default:
        }
        resolve()
      })

    }
  }
}
