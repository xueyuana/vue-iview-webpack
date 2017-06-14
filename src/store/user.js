/* 保存我的资源数据*/
export const userData= {
  // 存储状态值
  state: {
    datas: [], // 原始数据
    information: [],
    approvalStatus:[]  // 审批状态
  },
  // 状态值的改变方法,操作状态值
  mutations: {
    setOriginData(state, newDatas) {
      state.datas.push(newDatas);
      // console.log(state.datas)
    },
    setInformation(state,information) {
      state.information.push(information)
    },
    setApprovalStatus(state, newData){
      state.approvalStatus.push(newData)
    }
  },
  getters: {},

  actions: {//处理异步的方法
    getResourceDataAsync(context,newDatas) {
      context.commit('getResourceData',newDatas);
    }
  }
}
