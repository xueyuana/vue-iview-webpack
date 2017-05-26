/* 保存进入审批页面的源路径*/

export const path = {
    // 存储状态值
    state: {
        originPath: ''
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        // 保存获取的所有 groups
        getOriginPath(state, newPath) {
            state.originPath = newPath;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getOriginPathAsync(context,newPath) {
            context.commit('getOriginPath',newPath);
        }
    }
}
