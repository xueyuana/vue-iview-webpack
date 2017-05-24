/* 保存我的资源数据*/
export const resourceData= {
    // 存储状态值
    state: {
        datas: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        getResourceData(state, newDatas) {
            state.datas = newDatas;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getResourceDataAsync(context,newDatas) {
            context.commit('getResourceData',newDatas);
        }
    }
}
