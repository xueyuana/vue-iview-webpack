<template>
    <form>
        <div class="container" v-for="item in items">
            <div class="but-container">
                <Button type="primary" class="button" style="width: 80px">通过</Button>
                <Button type="primary" style="width: 80px">不通过</Button>
            </div>
            <div>
                <div>
                    <Button class="deplay-content-button"
                            :class="{active: activeIndex === index}"
                            v-for="(tab, index) in tabs"
                            @click="onTabs(index)"
                            size="large"
                            shape="circle"
                            style="margin-right:10px">{{ tab }}
                    </Button>
                </div>
                <div class="project">
                    <p class="title">项目信息：</p>
                    <div class="pro-container">
                        <div class="pro-content">
                            <div class="item">
                                <span>资源名称：</span>
                                <span class="cont-data">{{ item.sourceName }}</span>
                            </div>
                            <div class="item">
                                <span>所属项目：</span>
                                <span class="cont-data">{{ item.itemType }}</span>
                            </div>
                        </div>
                        <div class="pro-content">
                            <div class="item">
                                <span>归属部门：</span>
                                <span class="cont-data">{{ item.depart }}</span>
                            </div>
                            <div class="item">
                                <span>资源ID：</span>
                                <span class="cont-data">{{ item.sourceId }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="compute">
                    <p class="title">计算信息：</p>
                    <div class="compute-container">
                        <div class="compute-content">
                            <div class="item">
                                <span>实例规格：</span>
                                <span class="cont-data">{{ item.comCaseSpec }}</span>
                            </div>
                            <div class="item">
                                <span style="padding-right: 30px">镜像：</span>
                                <span style="padding-right: 10px">类别</span>
                                <span class="cont-data small" style="margin-right: 55px">{{ item.category }}</span>
                                <span style="padding-right: 10px">版本</span>
                                <span class="cont-data small">{{ item.ver }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="source">
                    <p class="title">资源信息：</p>
                    <div class="source-container">
                        <Tabs type="card" :animated="false">
                            <Tab-pane label="MYSQL">
                                <div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>实例名称：</span>
                                            <span class="cont-data">{{ item.caseName }}</span>
                                        </div>
                                        <div class="item">
                                            <span>实例规格：</span>
                                            <span class="cont-data">{{ item.caseSpec }}</span>
                                        </div>
                                    </div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>存储空间：</span>
                                            <span class="cont-data">{{ item.stor }}</span>
                                        </div>
                                        <div class="item">
                                            <span>实例版本：</span>
                                            <span class="cont-data">{{ item.mysqlVer }}</span>
                                        </div>
                                    </div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>实例数量：</span>
                                            <span class="cont-data">{{ item.caseAmount }}</span>
                                        </div>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="REDIS">
                                <div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>实例名称：</span>
                                            <span class="cont-data">{{ item.caseName }}</span>
                                        </div>
                                        <div class="item">
                                            <span>实例规格：</span>
                                            <span class="cont-data">{{ item.caseSpec }}</span>
                                        </div>
                                    </div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>实例版本：</span>
                                            <span class="cont-data">{{ item.redisVer }}</span>
                                        </div>
                                        <div class="item">
                                            <span>实例数量：</span>
                                            <span class="cont-data">{{ item.caseAmount }}</span>
                                        </div>
                                    </div>
                                </div>
                            </Tab-pane>
                            <Tab-pane label="MONGODB">
                                <div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>实例名称：</span>
                                            <span class="cont-data">{{ item.caseName }}</span>
                                        </div>
                                        <div class="item">
                                            <span>实例规格：</span>
                                            <span class="cont-data">{{ item.caseSpec }}</span>
                                        </div>
                                    </div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>存储空间：</span>
                                            <span class="cont-data">{{ item.stor }}</span>
                                        </div>
                                        <div class="item">
                                            <span>实例版本：</span>
                                            <span class="cont-data">{{ item.mongodbVer }}</span>
                                        </div>
                                    </div>
                                    <div class="source-content">
                                        <div class="item">
                                            <span>实例数量：</span>
                                            <span class="cont-data">{{ item.caseAmount }}</span>
                                        </div>
                                    </div>
                                </div>
                            </Tab-pane>
                        </Tabs>
                    </div>
                </div>
                <div class="advice">
                    <p class="title">审批意见：</p>
                    <div class="advice-cont">
                        <textarea placeholder="请填写同意或不同意"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
    .container {
        width: 860px;
        margin: 20px 30px;
    }

    .but-container {
        text-align: right;
    }

    .button {
        margin-right: 20px;
    }

    .project {
        margin-top: 10px;
    }

    .title {
        height: 30px;
        width: 100%;
        line-height: 30px;
        font-weight: 700;
        font-style: normal;
        text-align: left;
        font-size: 13px;
        color: #333;
        background-color: #f2f2f2;
    }

    .pro-container {
        height: 90px;
        padding: 10px;
    }

    .pro-content {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        margin: 0 110px 10px 0;
    }

    .item {
        display: flex;
        align-items: center;
    }

    .item .cont-data {
        width: 160px;
        border: 1px solid #aaa;
    }

    .item span {
        height: 24px;
        line-height: 24px;
        font-weight: 400;
        font-style: normal;
        font-size: 13px;
        text-align: center;
        color: #333;

    }

    .compute-container {
        height: 50px;
        padding: 10px;
    }

    .compute-content {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        margin: 0 110px 10px 0;
    }

    .small {
        width: 90px !important;
    }

    .source-container {
        width: 835px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #aaa;
    }

    .source-but {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #000;
    }

    .source-content {
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        margin: 0 110px 10px 0;
    }

    .advice {
        margin-top: 10px;
    }

    .advice-cont {
        width: 835px;
        height: 90px;
        margin: 10px;
    }
    .advice-cont textarea{
        width: 835px;
        height: 90px;
        resize:none;
        padding: 10px;
    }
</style>

<script>
    export default {
        methods: {
            onTabs(index) {
                this.activeIndex = index
            }
        },
        data() {
            return {
                activeIndex: 0,
                tabs: ['开发环境', '测试环境', '生产环境'],
                items: [{
                    mode: 'mysql',
                    sourceName: '测试项目',
                    itemType: 'Toon',
                    depart: 'syswin-toon',
                    sourceId: '53652451',
                    comCaseSpec: '2C 4G',
                    category: 'PHP',
                    ver: 'PHP 5.5',
                    caseName: 'test',
                    caseSpec: '1核 2GB',
                    stor: '20GB',
                    mysqlVer: 'MYSQL5.5',
                    caseAmount: '1台',
                    redisVer: 'redis3.0',
                    mongodbVer: 'mongodb3.0'
                }]

            }
        }
    }

</script>