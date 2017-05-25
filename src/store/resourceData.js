/* 保存我的资源数据*/
export const resourceData= {
    // 存储状态值
    state: {
        datas: [], // 原始数据
        filterDates:[]  // 删选
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        getOriginData(state, newDatas) {
            state.datas = newDatas;
        },
        getFilterDate(state, newFilterDatas) {
            state.filterDates = newFilterDatas;
        }
    },
    getters: {},

    actions: {//处理异步的方法
        getResourceDataAsync(context,newDatas) {
            context.commit('getResourceData',newDatas);
        }
    }
}
