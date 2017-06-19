/* 保存我的资源数据*/
export const userData= {
  // 存储状态值
  state: {
    information: []
  },
  // 状态值的改变方法,操作状态值
  mutations: {
    setInformation(state,information) {
      state.information.push(information)
    },
    setStatus(state, newStatus){
      state.information[0].status = newStatus
    }
  },
  getters: {},

  actions: {//处理异步的方法
    getResourceDataAsync(context,newDatas) {
      context.commit('getResourceData',newDatas);
    }
  }
}
