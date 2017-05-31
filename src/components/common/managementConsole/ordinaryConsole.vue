<template>
    <div>
    <div class="proMain clearfix">
        <Row :gutter="64">
            <Col span="9">
                  <div class="proCard">
                        <div class="proCardTitle">待办事项</div>
                        <div class="proCardContent">
                            <ul>
                                <li @click="goResourceHistory">
                                    <span class="name">待审批</span>
                                    <span class="number fr"  v-cloak>{{ unapprovedNum }}</span>
                                </li>
                            </ul>
                        </div>
                 </div>
            </Col>
            <Col span="10" offset="5">
               <Row :gutter="24">
                   <Col span="8">
                       <div class="proButtons">
                       <div @click="goCreateProject">
                           <div class="content">创建部署单元</div>
                           <div class="title">
                               <Icon type="android-add"></Icon>
                           </div>
                       </div>
                   </div>
                   </Col>
                   <Col span="8">
                       <div class="proButtons">
                       <div @click="goResourceApp">
                           <div class="content">资源申请</div>
                           <div class="title">
                               <Icon type="android-add"></Icon>
                           </div>
                       </div>
                   </div>
                   </Col>
                   <Col span="8">
                      <div class="proButtons">
                       <div @click="goApplcationDeploy">
                           <div class="content">应用部署</div>
                           <div class="title">
                               <Icon type="android-add"></Icon>
                           </div>
                       </div>
                   </div>
                   </Col>
               </Row>
            </Col>
        </Row>
    </div>

    <div class="survey">
        <div  class="title">
            <span>概况</span>
        </div>
        <div class="survey-list">
            <Row :gutter="24">
                <Col span="6">
                    <div class="deployment public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-server" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">部署单元</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="computer public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-cubes" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">计算实例</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>

                    </div>
                </Col>
                <Col span="6">
                    <div class="database public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-database" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">数据库实例</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                               <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </Col>
                <Col span="6">
                    <div class="cache public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-hdd-o" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">缓存实例</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                               <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
    </div>
</template>

<script>

</script>

<style scoped>
    .survey {
        margin-top: 40px;

    }
    .survey .title {
        background-color: #0AB7E9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        width: 80px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .survey .survey-list {

    }
    .survey-list {
        margin-top: 10px;
    }
    .survey-list h3 {
        padding: 5px 10px;
        background-color: #D7D7D7;
    }
    .survey-list li {
        margin: 10px 0px;
    }

    .public .top {
        height: 100px;
        background-color: #00CCFF;
        padding: 0 10px;
        color: #333333;
        border-radius: 4px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    .public .bottom {
        height: 40px;
        line-height: 40px;
        border: 1px solid #aaa;
        padding: 0 10px;
        cursor: pointer;
        border-radius: 4px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .top .top_left {
        font-size: 40px;
        line-height: 100px;

    }
    .top .top_right {
        font-size: 16px;
        text-align: center;
        margin-top: 20px;
    }
    .top_right .name {
        margin-top: 20px;
    }
    .bottom {
        color: #333333;
    }
    .bottom .arrow {
        font-size: 18px;
    }

    .proMain {
        /*width: 90%;*/
    }

    .proCard {
        /*width: 250px;*/
        /*float: left;*/
        border: 1px solid #39f;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        height: 120px;
        /*margin-right: 30px;*/

    }

    .proCardTitle {
        height: 30px;
        background-color: #39f;
        color: #fff;
        font-size: 16px;
        text-align: left;
        padding-left: 10px;
        padding-top: 5px;
    }

    .proCardContent {
        padding: 20px;
        color: #0066cc;
        font-size: 16px;
    }
    .proCardContent li {
        cursor: pointer;
    }
    .proCardContent .name {
        padding-right: 10px;
        display: block;
        float: left;
    }
    .proCardContent .name:hover {
        text-decoration: underline;
    }

    .proCardContent .number {
        -webkit-border-radius: 13px;
        border-radius: 13px;
        -moz-border-radius: 13px;
        background-color: red;
        color: #fff;
        width: 22px;
        height: 22px;
        text-align: center;
        display: -moz-box;
        display: -webkit-box;
        display: box;
        -moz-box-orient: horizontal;
        -webkit-box-orient: horizontal;
        box-orient: horizontal;
        -moz-box-pack: center;
        -moz-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        box-pack: center;
        box-align: center;

    }

    .proButtons {
        /*width: 120px;*/
        /*float: left;*/
        height: 120px;
        /*margin-right: 30px;*/

    }
    .proButtons>div {
        cursor: pointer;
    }
    .proButtons .title {
        text-align: center;
        height: 80px;
        color: #39f;
        font-size: 30px;
        padding-top: 20px;
        border: 1px solid #aaa;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-border-radius: 2px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }

    .proButtons .content {
        color: #fff;
        text-align: center;
        background-color: #39f;
        height: 40px;
        padding-top: 10px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-border-radius: 2px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .proContent h3 {
        color: #39f;
        margin: 5px
    }

    .proContent .precontents ul li {
        margin: 5px
    }
</style>
<script>
    import common from '../../../tools/common.js';

    export default {
        data () {
            return {
                unapprovedNum:''

            }
        },

        mounted() {
            this.getApprovedNum();
        },
        methods: {
            // 获取资源待审批数量

            getApprovedNum () {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                let query = userInfo.user_id;

                const url = common.apihost + 'resource/?user_id='+query;

                // 查询条件
                this.$http.get(url)
                        .then(response => {
                            console.log(response);
                            if (response.body.code === 200) { // 请求成功
                                let backDatas = response.body.result.msg;

                                for(let i=0;i<backDatas.length;i++) {
                                    let backDataObj=backDatas[i];
                                    // 审批中和保存到草稿的
                                    if(backDataObj.approval_status==="processing" || backDataObj.approval_status==="unsubmit") {
                                        this.unapprovedNum++;
                                    }

                                }
                            }
                        });
            },

            // 点击待办事项 跳转到资源申请历史页面
            goResourceHistory () {
                this.$router.push({name: 'res_applicationHistory'});
//
//                this.$store.commit('getLevel',{
//                    level_1: this.$store.state.breadcrumbData.level.level_1,
//                    level_2: '申请历史'
//                });
//
//                // 打开项设置
//                this.$store.commit('getActiveItem',{
//                    openNames:'2',  // Submenu
//                    activeName:'22'  //Menu-item
//                });
            },
            // 点击跳转到创建部署单元
            goCreateProject () {
                this.$router.push({name: 'projectApplication'});
//
//                this.$store.commit('getLevel',{
//                    level_1: this.$store.state.breadcrumbData.level.level_1,
//                    level_2: '创建部署单元'
//                });
//                // 打开项设置
//                this.$store.commit('getActiveItem',{
//                    openNames:'1',  // Submenu
//                    activeName:'11'  //Menu-item
//                });
            },
            // 点击跳转到资源申请
            goResourceApp () {
                this.$router.push({name: 'resourceApplication'});
//                this.$store.commit('getLevel',{
//                    level_1: this.$store.state.breadcrumbData.level.level_1,
//                    level_2: '资源申请'
//                });
//                // 打开项设置
//                this.$store.commit('getActiveItem',{
//                    openNames:'2',  // Submenu
//                    activeName:'21'  //Menu-item
//                });
            },
            // 点击跳转到应用部署
            goApplcationDeploy () {
                this.$router.push({name: 'applicationDeployment'});
//                this.$store.commit('getLevel',{
//                    level_1: this.$store.state.breadcrumbData.level.level_1,
//                    level_2: '应用部署'
//                });
//                // 打开项设置
//                this.$store.commit('getActiveItem',{
//                    openNames:'3',  // Submenu
//                    activeName:'31'  //Menu-item
//                });
            }
        }
    }
</script>