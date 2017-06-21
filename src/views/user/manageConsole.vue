<template>
    <div class="box">
        <div class="sub-title-bg">
            <span>资源概览</span>
        </div>
        <div class="survey">
            <div class="survey-list">
                <Row :gutter="24">
                    <Col span="8">
                        <div class="computer public">
                            <div class="top clearfix">
                                <div class="top_left fl">
                                    <Icon type="ios-monitor" size="62" color="#8BC34A"></Icon>
                                </div>
                                <div class="top_right fr">
                                    <div class="count" v-model="dataList.list">{{ resourceNum }}</div>
                                    <div class="name">部署实例</div>
                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col span="8">
                        <div class="deployment public">
                            <div class="top clearfix">
                                <div class="top_left fl">
                                    <Icon type="ios-cloud" size="62" color="#ff8a65"></Icon>
                                </div>
                                <div class="top_right fr">
                                    <div class="count" v-model="dataList.count">{{ projectNum }}</div>
                                    <div class="name">云主机</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="database public">
                            <div class="top clearfix">
                                <div class="top_left fl">
                                    <Icon type="easel" size="62" color="#8BC34A"></Icon>
                                </div>
                                <div class="top_right fr">
                                    <div class="count" v-model="dataList.sqlmongo">{{ vcpuNum }}</div>
                                    <div class="name">VCPU</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="proMain clearfix">
            <Row :gutter="24">
                <Col span="8">
                    <div class="cache public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <Icon type="android-options" size="62" color="#3BCCE1"></Icon>
                            </div>
                            <div class="top_right fr">
                                <div class="count" v-model="dataList.redies">{{ databaseNum }}</div>
                                <div class="name">内存</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="cache public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <Icon type="social-instagram" size="62" color="#BA68C8"></Icon>
                            </div>
                            <div class="top_right fr">
                                <div class="count" v-model="dataList.redies">{{ memeryNum }}</div>
                                <div class="name">硬盘</div>
                            </div>
                        </div>
                    </div>
                </Col>
               <Col span="8">
                   <div class="proButtons">
                       <div @click="goResourceApp">
                           <div class="title"><Icon type="plus" size="20"></Icon> 资源申请</div>
                       </div>
                   </div>
               </Col>
            </Row>
        </div>
        <div class="sub-title-bg">
            <span>资源审批</span>
        </div>
        <Row class="c_application">
            <Col span="12">
                <div @click="myApplication">
                    <Icon type="record" size="10"></Icon>我的申请
                    <span class="title">待审批：</span><span class="num">{{ pendingApproval }}</span>
                    <span class="title">已审批：</span><span class="num">{{ approved }}</span>
                </div>
            </Col>
            <Col span="12"></Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                dataList: {},
                // 统计个数
                projectNum: 1,
                resourceNum: 1,
                vcpuNum: 1,
                databaseNum: 1,
                memeryNum: 1,
                pendingApproval: 1,
                approved:1
            }
        },

        mounted() {

        },
        methods: {
            goResourceApp () {
                this.$router.push({name: 'user_resourceApplication'});
            },
            myApplication () {
                this.$router.push({name: 'user_resourceQuery'});
            }
        }
    }
</script>

<style scoped>
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
        height: 144px;
        background: #FFFFFF;
        border: 1px solid #EAEDF1;
        padding: 0 20px;
        color: #AEAEAE;
        border-radius: 2px;
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
        margin: 40px 0;
    }
    .proCard {
        border: 1px solid #39f;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        height: 120px;

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
        height: 120px;
    }
    .proButtons>div {
        cursor: pointer;
        font-size: 20px;
        color: #AEAEAE;
        line-height: 20px;
    }
    .proButtons .title {
        text-align: center;
        height: 144px;
        line-height: 144px;
        font-size: 20px;
        border: 1px solid #EAEDF1;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-border-radius: 2px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .proContent h3 {
        color: #39f;
        margin: 5px
    }
    .proContent .precontents ul li {
        margin: 5px
    }
    .box{
        /*border:1px dashed #CCC;
        padding: 30px 100px;*/
    }
</style>