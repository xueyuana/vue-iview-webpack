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
                    <li class="username">
                        用户：
                        <span>{{userInfo.username}}</span>
                    </li>
                    <li class="department">
                        所属部门：
                        <span>{{userInfo.department}}</span>
                    </li>
                    <li @click="toLogOut">
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
                        <Menu :active-name="$store.state.openMenu.activeItem.activeName" :open-names="[$store.state.openMenu.activeItem.openNames]" theme="dark" width="auto"  @on-select="go">
                            <div class="layout-logo-left" @click="goConsole">
                                管理控制台
                            </div>
                            <Submenu name="1">
                                <template slot="title">
                                    部署单元管理
                                </template>
                                <Menu-item name="11">创建部署单元</Menu-item>
                                <Menu-item name="12">部署单元查询</Menu-item>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    部署实例管理
                                </template>
                                <Menu-item name="21">部署实例申请</Menu-item>
                                <Menu-item name="22">部署实例列表</Menu-item>
                                <Menu-item name="23">我的申请</Menu-item>
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
                                <Menu-item name="41">我的工作台</Menu-item>
                                <Menu-item name="42">我的资源</Menu-item>
                                <Menu-item name="43">资源视图</Menu-item>
                            </Submenu>
                            <Submenu name="5" v-if="userInfo.is_admin">
                                <template slot="title">
                                    权限管理
                                </template>
                                <Menu-item name="51">添加权限</Menu-item>
                            </Submenu>
                        </Menu>
                    </i-col>
                    <i-col span="20" offset="4">
                        <div class="layout-header">
                            <Breadcrumb separator=">" v-if="$store.state.breadcrumbData.level.level_3">
                                <Breadcrumb-item href="#">{{ $store.state.breadcrumbData.level.level_1 }}</Breadcrumb-item>
                                <Breadcrumb-item href="/resource_view">{{ $store.state.breadcrumbData.level.level_2 }}</Breadcrumb-item>
                                <Breadcrumb-item>{{ $store.state.breadcrumbData.level.level_3 }}</Breadcrumb-item>
                            </Breadcrumb>
                            <Breadcrumb separator=">" v-else>
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

                        <!--<div class="layout-copy">-->
                        <!--</div>-->

                    </i-col>
                </Row>
            </div>
        </div>

    </div>

</template>

<style scoped>
    .uop-header {
        height: 60px;
        width: 100%;
        line-height: 60px;
        padding: 0 20px;
        border-bottom: 1px solid #ECECEC;
        box-sizing: border-box;
        position: fixed;
        background: #f5f7f9;
        z-index: 999;
        top: 0px;
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
        margin-top: 60px;
    }

    .layout{
        /*border: 1px solid #d7dde4;*/
        /*background: #f5f7f9;*/
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
        position: fixed;
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
    import {setStroage, getStroage, removeStroage} from 'tools/cookieAction.js';
    import common from '../../tools/common.js';
    import {userinfo} from '../../tools/user.js';

    export default {

        data () {
            return {
                // 保存用户名
               userInfo:{}
            }
        },
        mounted () {
           this.getUserInfo();
        },
        methods: {
            // 获取用户名
            getUserInfo () {
               this.userInfo = getStroage('userInfo');
               console.log('用户信息', this.userInfo)
            },
            // 跳转到管理控制台
            goConsole () {
                // 根据不同身份跳转不同界面
                if (this.userInfo.is_admin) {
                  this.$router.push({path:'/admin_console'});
                } else {
                  this.$router.push({path:'/management_console'});
                }
            },
            // 退出登录
            toLogOut() {
                console.log('logput')
                removeStroage('userInfo')
            },

            // 导航跳转
            go (name) {
                switch (name){
                    case '11': //项目创建
                            // 跳转
                        this.$router.push({name: 'projectApplication'});
                            // 更改面包屑导航的值
//                        this.$store.commit('getLevel',{
//                            level_1: this.$store.state.breadcrumbData.level.level_1,
//                            level_2: '创建部署单元'
//                        });
//                            // 打开项设置
//                        this.$store.commit('getActiveItem',{
//                            openNames:'1',  // Submenu
//                            activeName:'11'  //Menu-item
//                        });
                        break;
                    case '12': //项目创建历史
                        this.$router.push({name: 'pro_applicationHistory'});
                        break;
                    case '21': //资源申请
                        this.$router.push({name: 'resourceApplication'});
                        break;
                    case '22': //资源申请历史
                        this.$router.push({name: 'res_applicationHistory'});
                        break;
                    case '23': //我的申请
                        this.$router.push({name: 'myApplication'});
                        break;
                    case '31': //应用部署
                        this.$router.push({name: 'applicationDeployment'});
                        break;
                    case '32': //部署历史
                        this.$router.push({name: 'deployHistory'});
                        break;
                    case '41': //我的工作台
                            if(this.userInfo.is_admin) {
                                this.$router.push({name: 'myWorkbench_admin'});
                            }else {
                                this.$router.push({name: 'myWorkbench_ordinary'});
                            }
                        break;
                    case '42': //我的资源
                        this.$router.push({name: 'myResource'});
                        break;
                    case '43': //资源视图
                        this.$router.push({name: 'resourceView'});
                        break;
                    case '51': //权限管理
                        this.$router.push({name: 'addAuthority'});
                        break;
                }
            }
        }
    }
</script>