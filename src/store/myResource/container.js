
/* 保存容器的数据*/
export const container = {
    // 存储状态值
    state: {
        datas: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        getContainerData(state, newDatas) {
            state.datas = newDatas;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getContainerDataAsync(context,newDatas) {
            context.commit('getContainerData',newDatas);
        }
    }
}