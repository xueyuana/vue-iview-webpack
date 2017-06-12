
/* 保存menu中被激活的项*/

export const subOpenMenu = {
    // 存储状态值
    state: {
        // 默认不打开任何项
        subActiveItem:{
            openNames:'',  // Submenu
            activeName:''  //Menu-item
        }
    },
    // 状态值的改变方法,操作状态值
    mutations: {
        // 保存数据
        getSubActiveItem(state, newActiveItem) {
            state.subActiveItem = newActiveItem;
        }
    }
}