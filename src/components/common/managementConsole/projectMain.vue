<template>
    <div class="proMain">
        <div class="proCard">
            <div class="proCardTitle">代办事项</div>
            <div class="proCardContent">
                <ul>
                    <li><span class="name">资源待审批</span><span class="number">0</span></li>
                </ul>
            </div>
        </div>

        <div class="proButton">
            <div class="proButtons">
                <a href="">
                    <div class="title">
                        <Icon type="android-add"></Icon>
                    </div>
                    <div class="content">项目申请</div>
                </a>
            </div>

            <div class="proButtons">
                <a href="">
                    <div class="title">
                        <Icon type="android-add"></Icon>
                    </div>
                    <div class="content">资源申请</div>
                </a>
            </div>
            <div class="proButtons">
                <a href="">
                    <div class="title">
                        <Icon type="android-add"></Icon>
                    </div>
                    <div class="content"> 部署申请
                    </div>
                </a>
            </div>
        </div>

        <div class="clear proContent">
            <Menu mode="horizontal" :theme="theme1" active-name="1">
                <Menu-item name="1">
                    <Icon type="ios-paper"></Icon>
                    我的资源
                </Menu-item>
            </Menu>
            <br>
            <div class="precontents">
                <Row>
                    <Col span="8">
                    <h3>弹性计算</h3>
                    <ul>
                        <li>云服务器</li>
                        <li>专有网络</li>
                        <li>容器服务</li>
                    </ul>
                    </Col>
                    <Col span="8">
                    <h3>数据库</h3>
                    <ul>
                        <li>云数据库HyBirdDB for Mysql</li>
                        <li>云数据库HyBirdDB</li>
                        <li>数据传输服务</li>
                    </ul>
                    </Col>
                    <Col span="8">
                    <h3>存储与CDN</h3>
                    <ul>
                        <li>CDN</li>

                    </ul>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <h3>网络</h3>
                    <ul>
                        <li>专有网络VPC</li>
                        <li>cdn</li>

                    </ul>
                    </Col>
                    <Col span="8">
                    <h3>分析</h3>
                    <ul>
                        <li>云数据库HyBirdDB</li>

                    </ul>
                    </Col>
                    <Col span="8">
                    <h3>监控与管理</h3>
                    <ul>
                        <li>云监控</li>

                    </ul>
                    </Col>
                </Row>
            </div>


        </div>
    </div>
</template>

<script>

</script>

<style scoped>
    .clear {
        clear: both
    }

    .proMain {
        width: 90%;
    }

    .proCard {
        width: 250px;
        float: left;
        border: 1px solid #39f;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        height: 120px;
        margin-right: 30px;

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

    .proCardContent .name {
        padding-right: 10px;
        display: block;
        float: left;
    }

    .proCardContent .number {
        float: left;
        -webkit-border-radius: 13px;
        border-radius: 13px;
        -moz-border-radius: 13px;
        background: #aaa;
        color: #fff;
        width: 26px;
        height: 26px;
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
        width: 120px;
        float: left;
        height: 120px;
        border: 1px solid #aaa;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-border-radius: 2px;
        margin-right: 30px;

    }

    .proButtons .title {
        text-align: center;

        height: 80px;
        color: #39f;
        font-size: 30px;
        padding-top: 20px;
    }

    .proButtons .content {
        border-top: 1px solid #aaa;
        color: #fff;
        text-align: center;
        background-color: #39f;
        height: 40px;
        padding-top: 10px;
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

</script>