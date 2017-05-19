
/* 保存menu中被激活的项*/

export const openMenu = {
    // 存储状态值
    state: {
        activeItem:{
            openNames:'',  //
            activeName:''  //
        }
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        // 保存数据
        getActiveItem(state, newActiveItem) {
            state.activeItem = newActiveItem;
        },
    },
    getters: {},

    actions: {//处理异步的方法
        getActiveItemAsync(context,newActiveItem) {
            context.commit('getActiveItem',newActiveItem);
        }
    }
}