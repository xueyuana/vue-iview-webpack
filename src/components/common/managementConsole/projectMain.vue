<template>
    <div>
    <div class="proMain clearfix">
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
    </div>
    <div class="resource">
        <div  class="title">
            <span>我的资源</span>
        </div>
        <div class="resource-list">
            <Row>
                <Col span="6">
                <div class="computing-resource" style="text-align: center">
                    <h3>计算资源</h3>
                    <ul>
                        <li>
                            <span class="res-name">容器DOCKER</span>
                            <span class="res-count">2</span>
                        </li>
                    </ul>
                </div>
                </Col>
                <Col span="6">
                <div class="database" style="text-align: center">
                    <h3>数据库</h3>
                    <ul>
                        <li>
                            <span class="res-name">MYSQL</span>
                            <span class="res-count">2</span>
                        </li>
                        <li>
                            <span class="res-name">REDIS</span>
                            <span class="res-count">3</span>
                        </li>
                    </ul>
                </div>
                </Col>
                <Col span="6">
                <div class="storage" style="text-align: center">
                    <h3>存储</h3>
                </div>
                </Col>
                <Col span="6">
                <div class="domain" style="text-align: center">
                    <h3>域名</h3>
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
    .resource {
        margin-top: 20px;

    }
    .resource .title {
        background-color: #0AB7E9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        width: 80px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .resource .resource-list {
        border: 1px solid #797979;
    }
    .resource-list {
        margin-top: 10px;
    }
    .resource-list h3 {
        padding: 5px 10px;
        background-color: #D7D7D7;
    }
    .resource-list li {
        margin: 10px 0px;
    }
    .res-count {
        margin-left: 5px;
        text-decoration: underline;
    }
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