/* 保存layer对应的所有分组信息*/

export const projectInfo = {
    // 存储状态值
    state: {
        projectList: []
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        // 保存获取的所有 groups
        getProjectList(state, newProjectList) {
            state.groups = newProjectList;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getProjectListAsync(context,newProjectList) {
            context.commit('getProjectList',newProjectList);
        }
    }
}