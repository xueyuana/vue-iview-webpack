<template>
    <div class="">
        <Row type="flex" class="c-ivu-row-flex">
            <Col span="2" order="1" class="ivu-col-img c-ivu-col"><img src="../../static/logo.png" alt=""></Col>
            <Col span="3" order="2" class="c-ivu-col">最新公告</Col>
            <Col span="3" order="3" class="c-ivu-col">云资源</Col>
            <Col span="3" order="4" class="c-ivu-col">帮助与支持</Col>
            <Col span="3" order="5" class="c-ivu-col">关于我们</Col>
            <Col span="7" order="6" class="c-ivu-col">&nbsp;</Col>
            <Col span="3" order="7" class="c-ivu-col"><span @click="render">控制台11</span></Col>
        </Row>
        <Carousel autoplay v-model="value2">
            <Carousel-item>
                <div class="demo-carousel">演示一</div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">演示二</div>
            </Carousel-item>
            <Carousel-item>
                <div class="demo-carousel">演示三</div>
            </Carousel-item>
        </Carousel>
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

<style scoped>
.c-ivu-row-flex{
    background: #f8f8f9;
    height: 100px;
}
.c-ivu-col{
    text-align: center;
    line-height: 100px;
    font-size: 16px;
    color: #3399FF;
}
.ivu-col-img{
    text-align: left;
}
.ivu-col-img img{
    height: 100%;
}
.ivu-carousel{
    height: 600px;
}
.demo-carousel{
    text-align: center;
    font-size: 50px;
    height:600px;
    line-height: 600px;
    background: #506b9e;
    color: #fff;
    overflow: hidden;
}
.demo-carousel img{
    width: 100%;
    height: 100%;
}
.c-ivu-row-flex2{
    background: #f8f8f9;
    padding:30px 50px;
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
</style>
<script>
export default {
    data() {
        return {
            value2: 0
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