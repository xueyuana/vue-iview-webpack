
/* 保存mysql的数据*/
export const mysql = {
    // 存储状态值
    state: {
        datas: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        getMysqlData(state, newDatas) {
            state.datas = newDatas;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getMysqlDataAsync(context,newDatas) {
            context.commit('getMysqlData',newDatas);
        }
    }
}