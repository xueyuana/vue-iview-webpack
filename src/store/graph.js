
/* 保存进入部署实例的架构属兔视图数据*/

export const graph = {
    // 存储状态值
    state: {
        graphDatas: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        // 保存获取的所有 groups
        getGraphDatas(state, newData) {
            state.graphDatas = newData;
        }
    }
}
