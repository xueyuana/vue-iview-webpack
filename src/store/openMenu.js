/* 保存menu中被激活的项*/

export const openMenu = {
  // 存储状态值
  state: {
    // 默认不打开任何项
    openMenu: ''
  },
  // 状态值的改变方法,操作状态值
  mutations: {
    // 保存数据
    getOpenMeun(state, newActiveItem) {
      state.openMenu = newActiveItem
    },
  },
  getters: {},

  actions: {//处理异步的方法
    getActiveItemAsync(context, newActiveItem) {
      context.commit('getOpenMeun', newActiveItem);
    }
  }
}