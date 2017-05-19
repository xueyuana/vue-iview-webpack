<template>
    <div>
        <!--头部-->
        <div class="uop-header clearfix">
            <div class="logo fl">
                <a href="#">
                    <img src="../../../static/image/syswinLogo.png" alt="" width="160px">
                </a>
            </div>
            <div class="uop-title fl">
                <p>技术运维管理平台</p>
            </div>
            <div class="user-info fr">
                <ul>
                    <li>
                        用户：
                        <span>用户名</span>
                    </li>
                    <li>
                        <a href="#">修改密码</a>
                    </li>
                    <li>
                        <a href="#">退出</a>
                    </li>
                </ul>
            </div>
        </div>

        <!--主题内容-->
        <div class="uop-main">
            <div class="layout">
                <Row type="flex">
                    <i-col span="4" class="layout-menu-left">
                        <Menu active-name="11" theme="dark" width="auto" :open-names="['1']" @on-select="go">
                            <div class="layout-logo-left" @click="goConsole">
                                管理控制台
                            </div>
                            <Submenu name="1">
                                <template slot="title">
                                    项目管理
                                </template>
                                <Menu-item name="11">创建项目</Menu-item>
                                <Menu-item name="12">项目查询</Menu-item>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                   资源管理
                                </template>
                                <Menu-item name="21">资源申请</Menu-item>
                                <Menu-item name="22">申请历史</Menu-item>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                   持续交付
                                </template>
                                <Menu-item name="31">应用部署</Menu-item>
                                <Menu-item name="32">部署历史</Menu-item>
                            </Submenu>
                            <Submenu name="4">
                                <template slot="title">
                                    工作台
                                </template>
                                <Menu-item name="41">处理列表</Menu-item>
                                <Menu-item name="42">我的工作台</Menu-item>
                            </Submenu>
                            <Submenu name="5">
                                <template slot="title">
                                    权限管理
                                </template>
                                <Menu-item name="51">添加权限</Menu-item>
                            </Submenu>
                        </Menu>
                    </i-col>
                    <i-col span="20" offset="0">
                        <div class="layout-header">
                            <Breadcrumb separator=">">
                                <Breadcrumb-item href="#">{{ $store.state.breadcrumbData.level.level_1 }}</Breadcrumb-item>
                                <Breadcrumb-item>{{ $store.state.breadcrumbData.level.level_2 }}</Breadcrumb-item>
                            </Breadcrumb>
                        </div>
                        <div class="layout-content">
                            <div class="layout-content-main">
                                <!--被匹配的路由返回的组件-->
                                <router-view></router-view>
                            </div>
                        </div>

                    </i-col>
                </Row>
            </div>
        </div>

    </div>

</template>

<style scoped>
    .uop-header {
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        border-bottom: 1px solid #ECECEC;
        box-sizing: border-box;
    }

    .uop-header .logo {
        margin-top: 5px;
    }

    .uop-header .uop-title {
        margin-left: 60px;
        color: #3399FF;
        font-size: 18px;
    }

    .uop-header .user-info li {
        height: 100%;
        float: left;
        margin: 0 10px;
    }

    .uop-header .user-info li a {
        display: block;
        height: 100%;
    }

    /*主题内容布局*/
    .uop-main {
        width: 100%;
        margin-top: 15px;
    }

    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 800px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
        color: #fff;
        min-height: 800px;
    }
    .layout-header{
        margin-left: 15px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 100%;
        line-height: 50px;
        text-align: center;
        height: 50px;
        background: #5cadff;
        margin-bottom: 15px;
        color: #fff;
        cursor: pointer;
    }


</style>
<script>
    import common from '../../tools/common.js';

    export default {
        data () {
            return {

            }
        },

        methods: {
            // 跳转到管理控制台
            goConsole () {
                this.$router.push({name: 'managementConsole'});
                this.$store.commit('getLevel',{
                    level_1: this.$store.state.breadcrumbData.level.level_1,
                    level_2: '管理控制台'
                });
            },

            // 点击项目查询 请求获取项目创建信息
            getProjectInfo () {
                let self=this;
                const url=common.apihost+'iteminfo/iteminfoes/'+"test1";
                self.$http.get(url)
                        .then(response => {
                                console.log(response);
                                if(response.body.code===2002) { // 请求成功
                                    //  将项目信息列表 保存到状态池
                                    let backDatas=response.body.result.res;
                                    self.$store.commit("getProjectList",backDatas);
                                    console.log(self.$store.state.projectInfo.projectList);
                                }
                             });
            },

            // 导航跳转
            go (name) {
                switch (name){
                    case '11': //项目申请
                            // 跳转
                        this.$router.push({name: 'projectApplication'});
                            // 更改面包屑导航的值
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '创建项目'
                        });
                        break;
                    case '12': //项目申请历史
                        this.$router.push({name: 'pro_applicationHistory'});
                            // 获取项目信息
                        this.getProjectInfo();
                            // 保存面包屑导航
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '项目查询'
                        });
                        break;
                    case '21': //资源申请
                        this.$router.push({name: 'resourceApplication'});
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '资源申请'
                        });
                        break;
                    case '22': //资源申请历史
                        this.$router.push({name: 'res_applicationHistory'});
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '申请历史'
                        });
                        break;
                    case '31': //应用部署
                        this.$router.push({name: 'applicationDeployment'});
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '应用部署'
                        });
                        break;
                    case '32': //部署历史
                        this.$router.push({name: 'deployHistory'});
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '部署历史'
                        });
                        break;
                    case '41': //处理列表
                        this.$router.push({name: 'processList'});
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '处理列表'
                        });
                        break;
                    case '42': //我的工作台
                        this.$router.push({name: 'myWorkbench'});
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '我的工作台'
                        });
                        break;
                    case '51': //权限管理
                        this.$router.push({name: 'addAuthority'});
                        this.$store.commit('getLevel',{
                            level_1: this.$store.state.breadcrumbData.level.level_1,
                            level_2: '权限管理'
                        });
                        break;
                }
            }
        }
    }
</script>