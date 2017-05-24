

/* 保存mongodb的数据*/
export const mongodb = {
    // 存储状态值
    state: {
        datas: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        getMongodbData(state, newDatas) {
            state.datas = newDatas;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getMongodbDataAsync(context,newDatas) {
            context.commit('getMongodbData',newDatas);
        }
    }
}