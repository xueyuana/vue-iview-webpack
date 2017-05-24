
/* 保存部署单元对应的数据*/
export const deployUnit = {
    // 存储状态值
    state: {
        datas: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        getDeployUnitData(state, newDatas) {
            state.datas = newDatas;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getDeployUnitDataAsync(context,newDatas) {
            context.commit('getDeployUnitData',newDatas);
        }
    }
}