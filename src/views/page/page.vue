<template>
    <div class="c_page">
        <Row type="flex" class="c-ivu-row-flex">
            <Col span="2" order="1" class="ivu-col-img c-ivu-col"><img src="../../static/logo.png" alt=""></Col>
            <Col span="3" order="2" class="c-ivu-col">最新公告</Col>
            <Col span="3" order="3" class="c-ivu-col">云资源</Col>
            <Col span="3" order="4" class="c-ivu-col">帮助与支持</Col>
            <Col span="3" order="5" class="c-ivu-col">关于我们</Col>
            <Col span="7" order="6" class="c-ivu-col">&nbsp;</Col>
            <Col span="3" order="7" class="c-ivu-col"><span @click="render">控制台</span></Col>
        </Row>
        <Carousel autoplay v-model="value2">
            <Carousel-item>
                <div class="demo-carousel">1</div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel demo-carousel2">2</div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel demo-carousel3">3</div>
            </Carousel-item>
        </Carousel>
        <!--<div class="module1">
            <Breadcrumb>
                <Breadcrumb-item href="/">主页</Breadcrumb-item>
                <Breadcrumb-item>最新公告</Breadcrumb-item>
            </Breadcrumb>
            <Table :columns="announcement" :data="announcementdata1"></Table>
        </div>
        <div class="module1">
            <Breadcrumb>
                <Breadcrumb-item href="/">主页</Breadcrumb-item>
                <Breadcrumb-item>云资源</Breadcrumb-item>
            </Breadcrumb>
            <div class="c_title">
                <Icon type="android-radio-button-on"></Icon>
                <span>云服务器</span>
            </div>
            <Row class="module_row1">
                <Col span="4" class="module_row1l">弹性</Col>
                <Col span="20" class="module_row1r">
                    <div><b>弹性计算</b></div>
                    <div>在云上您可以在几分钟之内快速增加或删减云服务器数量，以满足您快速变化的业务需求；</div>
                </Col>
            </Row>
            <Row class="module_row1">
                <Col span="4" class="module_row1l">灵活</Col>
                <Col span="20" class="module_row1r">
                    <div><b>灵活配置</b></div>
                    <div>我们提供多种实例类型，操作系统和软件包供您选择。</div>
                </Col>
            </Row>
            <Row class="module_row1">
                <Col span="4" class="module_row1l">稳定</Col>
                <Col span="20" class="module_row1r">
                    <div><b>稳定可靠</b></div>
                    <div>提供99.95%的服务可用性；搭载稳定的网络架构，采用成熟的网络虚拟化技术和网卡绑定技术；</div>
                </Col>
            </Row>
            <Row class="module_row1">
                <Col span="4" class="module_row1l">易用</Col>
                <Col span="20" class="module_row1r">
                    <div><b>简单易用</b></div>
                    <div>您可以使用云控制台或CLI来完全控制您的服务器实例，随时查看和配置您的资源。</div>
                </Col>
            </Row>
            <Row class="module_row1">
                <Col span="4" class="module_row1l">控制</Col>
                <Col span="20" class="module_row1r">
                    <div><b>完全控制权</b></div>
                    <div>拥有操作系统的完全控制权，可通过连接管理终端，自行解决系统问题。</div>
                </Col>
            </Row>
        </div>
        <div class="module1">
            <Breadcrumb>
                <Breadcrumb-item href="/">主页</Breadcrumb-item>
                <Breadcrumb-item>帮助与支持</Breadcrumb-item>
            </Breadcrumb>
            <Table :columns="announcement" :data="announcementdata1"></Table>
        </div>-->
        <Row type="flex" class="c-ivu-row-flex2">
            <Col span="4" order="1">
                <dl>
                    <dt>帮助与支持</dt>
                    <dd>安全建议</dd>
                    <dd>文档中心</dd>
                    <dd>帮助中心</dd>
                </dl>
            </Col>
            <Col span="4" order="2">
                <dl>
                    <dt>关于我们</dt>
                    <dd>关于平台</dd>
                    <dd>联系我们</dd>
                </dl>
            </Col>
            <Col span="4" order="3">
                <dl>
                    <dt>联系方式</dt>
                    <dd>邮箱：xxx@xxx.com</dd>
                </dl>
            </Col>
            <Col span="8" order="4">&nbsp;</Col>
            <Col span="4" order="5">
                <dl>
                    <dt>门头沟经信委信息中心</dt>
                    <dd><img src="../../static/second-code.png" alt=""></dd>
                </dl>
            </Col>
        </Row>
        <div class="bottom">版权所有 © 2015-2017</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value2: 0,
            announcement: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                }
            ],
            announcementdata1: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                }
            ]
        }
    },
    computed: {},
    methods: {
        render () {
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<style scoped>
.c_page{
    background: #f8f8f9;
}
.c-ivu-row-flex{
    height: 100px;
    min-width: 960px;
    max-width: 1200px;
    margin: 0 auto;
}
.c-ivu-col{
    text-align: center;
    line-height: 100px;
    font-size: 16px;
    color: #3399FF;
    cursor: pointer;
}
.ivu-col-img{
    text-align: left;
}
.ivu-col-img img{
    height: 80%;
    margin: 10%;
}
.ivu-carousel{
    height: 600px;
}
.demo-carousel{
    height:600px;
    /*background: url("../../static/bj1.jpg")center center no-repeat;*/
    overflow: hidden;
}
.demo-carousel2{
    /*background: url("../../static/bj2.jpg")center center no-repeat;*/
}
.demo-carousel3{
    /*background: url("../../static/bj3.jpg")center center no-repeat;*/
}
.demo-carousel img{
    width: 100%;
    height: 100%;
}
.c-ivu-row-flex2{
    padding:30px 0;
    min-width: 960px;
    max-width: 1200px;
    margin: 0 auto;
}
.c-ivu-row-flex2 div {}
.c-ivu-row-flex2 div dl dt{
    line-height: 50px;
    font-size: 18px;
}
.c-ivu-row-flex2 div dl dd{
    line-height: 30px;
    font-size: 14px;
}
.bottom{
    font-size: 12px;
    background: #ccc;
    text-align: center;
    line-height: 40px;
}
.module1{
    width:90%;
    margin: 0 auto;
}
.ivu-breadcrumb{
    line-height: 40px;
}
.c_title {
    background-color: #0AB7E9;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
}
.module_row1{
    border-top: 1px solid #e9eaec;
}
.module_row1l{
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    border-right: 1px solid #ccc;
}
.module_row1r{
    line-height:20px;
    padding:10px 20px;
    font-size: 14px;
}
</style>