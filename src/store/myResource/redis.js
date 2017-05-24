
/* 保存mysql的数据*/
export const redis = {
    // 存储状态值
    state: {
        datas: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        getRedisData(state, newDatas) {
            state.datas = newDatas;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getRedisDataAsync(context,newDatas) {
            context.commit('getRedisData',newDatas);
        }
    }
}