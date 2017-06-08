<template>
    <div class="resource-view">
        <Row>
            <Col span="4">
              <div class="view-left scrollbar">
                <Menu
                        :theme="theme"
                        :active-name="$store.state.subOpenMenu.subActiveItem.activeName"
                        :open-names="[$store.state.subOpenMenu.subActiveItem.openNames]"
                        width="auto" @on-select="goResourceTree">
                    <Submenu :name="menuData._id.project" v-for="(menuData,index) in menuDatas" :key="menuData">
                        <template slot="title">
                           {{menuData._id.project}}
                        </template>
                        <Menu-item :name="instanceObj.res_id" v-for="instanceObj in menuData.ret" :key="instanceObj">
                            {{ instanceObj.resource_name }}
                        </Menu-item>

                    </Submenu>
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
            // 获取拥有资源的部署单元的信息
            getDeployUit() {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                let url='';

                if (!userInfo.is_admin) { //普通用户
                    url = common.apihost + 'resource/?user_id='+userInfo.user_id+'&agg_by=project&agg_expr=res_id&agg_expr=resource_name';
                }else  {
                    url = common.apihost + 'resource/?agg_by=project&agg_expr=res_id&agg_expr=resource_name';
                }

                this.$http.get(url)
                        .then(response => {
                                console.log(response);
                                if (response.body.code === 200) { // 请求成功
                                    let backDatas = response.body.result.msg;
                                    this.menuDatas=backDatas;

                                    this.$router.push({ name:"resourceTree",params:{ resource_id:backDatas[0].ret[0].res_id}});

                                    // 修改面包屑导航的数据
                                    this.$store.commit('getLevel',{
                                        level_1: this.$store.state.breadcrumbData.level.level_1,
                                        level_2: this.$store.state.breadcrumbData.level.level_2,
                                        level_3: this.getNameById(this.$route.params.resource_id).resource_name
                                    });
                                }
                        });
            },

            //  根据id获取name
            getNameById (id) {
                // 设置面包屑导航的数据
                for(let i=0;i<this.menuDatas.length;i++) {
                    let menuData=this.menuDatas[i];
                    for(let j=0;j<menuData.ret.length;j++) {
                        let retObj=menuData.ret[j];
                        if(retObj.res_id===id) {
                            return {
                                resource_name:retObj.resource_name,
                                openName:menuData._id.project
                            }
                        }
                    }
                }
            },

            // 跳转到相应的资源架构图
            goResourceTree (name) {
//                console.log(name);

                // 跳转到部署实例的视图
                this.$router.push({ name:"resourceTree",params:{ resource_id:name}});

                // 修改面包屑导航的数据
                this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: this.$store.state.breadcrumbData.level.level_2,
                            level_3: this.getNameById(name).resource_name
                });
            }
        },

        watch: {
            '$route' (to, from) {
                console.log("动态路径参数" + this.$route.params.resource_id);
                // 设置默认打开项
                this.$store.commit("getSubActiveItem",{
                    openNames: this.getNameById(this.$route.params.resource_id).openName,  // Submenu
                    activeName: this.$route.params.resource_id  //Menu-item
                });
                console.log(this.$store.state.subOpenMenu.subActiveItem);

            }
        }
    }
</script>