/* 保存面包屑导航的信息*/

export const breadcrumbData = {
  // 存储状态值
  state: {
    level: {
      level_1: '主页', // 设置默认值
      level_2: '管理控制台'
    }
  },
  // 状态值的改变方法,操作状态值
  mutations: {
    // 保存数据
    getLevel(state, newLevel) {
      state.level = newLevel;
    },
  },
  getters: {},

  actions: {//处理异步的方法
    getLevelAsync(context, newLevel) {
      context.commit('getLevel', newLevel);
    }
  }
}