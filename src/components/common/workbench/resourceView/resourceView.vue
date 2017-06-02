<template>
    <div class="resource-view">
        <Row>
            <Col span="4">
              <div class="view-left scrollbar">
                <Menu :theme="theme" active-name="1" width="auto" @on-select="goResourceTree">
                    <Submenu :name="menuData.item_id" v-for="(menuData,index) in menuDatas" :key="menuData">
                        <template slot="title">
                           {{menuData.item_name}}
                        </template>
                        <Menu-item :name="0">
                            {{1}}
                        </Menu-item>
                        <!--<Menu-item :name="instanceObj.id" v-for="instanceObj in menuData.instance" :key="instanceObj">-->
                            <!--{{ instanceObj.resource }}-->
                        <!--</Menu-item>-->

                    </Submenu>
                    <!--<Menu-item :name="data.item_id" v-for="(data,index) in menuDatas" :key="data">-->
                        <!--<Icon type="star"></Icon>-->
                        <!--{{ data.item_name }}-->
                    <!--</Menu-item>-->
                </Menu>
            </div>
            </Col>
            <Col span="20">
                <div class="view-right">
                    <router-view></router-view>
                </div>
            </Col>
        </Row>
    </div>
</template>

<style scoped>
  .view-left {
      height: 500px;
      overflow: auto;
  }

  .scrollbar::-webkit-scrollbar{
      width: 8px;
      height: 8px;
      background-color: #f5f5f5;
  }
  /*定义滚动条的轨道，内阴影及圆角*/
  .scrollbar::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      border-radius: 10px;
      background-color: #f5f5f5;
  }
  /*定义滑块，内阴影及圆角*/
  .scrollbar::-webkit-scrollbar-thumb{
      /*width: 10px;*/
      /*height: 20px;*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #848484;
  }

</style>
<script>
    import common from '../../../../tools/common.js';
    export default {
        data () {
            return {
                theme: 'light',
                menuDatas:[]
            }
        },
        mounted() {
            this.getDeployUit();
        },
        methods:{
            getDeployUit() {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const url = common.apihost + 'iteminfo/iteminfoes/project_item';
                // 查询条件
                let query = {};

                if (!userInfo.is_admin) { //普通用户
                    query.user_id=userInfo.user_id; // 默认按照登录用户进行查询
                }

                // 查询条件
                this.$http.get(url,{params: query})
                        .then(response => {
                                console.log(response);
                                if (response.body.code === 200) { // 请求成功
                                    let backDatas = response.body.result.res;
//                                    this.menuDatas=backDatas;
                                    return backDatas;
                                }
                        }).then(menuDatas=>{
                            // 根据部署单元名称查询所有的部署实例
                           for(let i=0;i<menuDatas.length;i++) {
                               let menuDataObj=menuDatas[i];
                               let urlInstance=common.apihost+'resource/?project='+menuDataObj.item_name;
                               this.$http.get(urlInstance)
                                       .then(response=>{
                                           if( response.body.code===200){
                                               // 给menuDatas添加实例属性
                                                 menuDataObj.instance=response.body.result.msg;
//
                                           }
                                       })
                           }
                          this.menuDatas=menuDatas;
                          console.log(this.menuDatas);
//                          console.log(this.submenuDatas);
                        });
            },
            // 跳转到相应的资源架构图
            goResourceTree (name) {
                console.log(name);
                // 根据id获取部署实例的架构数据

                // 将数据保存到状态池中

                this.$router.push({ name:"resourceTree",params:{ resource_id:name}})
            }
        }
    }
</script>