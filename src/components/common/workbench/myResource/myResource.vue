<template>
    <div class="my-resource">
        <div class="my-resource-header">
            <div class="search-list">
                <div class="search-title">
                    <span style="color: #3399FF">
                        <Icon type="ios-circle-filled"></Icon>
                    </span>
                    <span>查询类型</span>
                </div>
                <div class="search-tabs">
                    <Tabs value="deployUnit" :animated="false" @on-click="getTabName">
                        <Tab-pane label="部署单元" name="deployUnit">
                            <!--集成部署单元内容组件-->
                            <deployUnit></deployUnit>
                        </Tab-pane>
                        <Tab-pane label="容器" name="container">
                            <!--集成容器子组件-->
                            <container></container>
                        </Tab-pane>
                        <Tab-pane label="MySQL" name="mysql">
                            <!--集成mysql子组件-->
                            <mysql></mysql>
                        </Tab-pane>
                        <Tab-pane label="Redis" name="redis">
                            <!--集成redis子组件-->
                            <redis></redis>
                        </Tab-pane>
                        <Tab-pane label="MongoDB" name="MongoDB">
                            <!--集成mongodb子组件-->
                            <mongodb></mongodb>
                        </Tab-pane>
                    </Tabs>
                </div>
            </div>
            <div class="search-right">
                <Tooltip content="刷新" placement="left">
                    <Button type="primary" icon="ios-loop-strong" style="background-color: #0c6;border:1px solid #0c6;color:#fff;"></Button>
                </Tooltip>
                <Button type="primary" style="margin-left: 10px">资源申请</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .my-resource {
        padding-top: 20px;
    }
    .my-resource-header {
        height: 37px;
        line-height: 37px;
        position: relative;
    }
    .search-title {
        font-size: 15px;
        /*padding: 0 16px;*/
        position: absolute;
        font-weight: 700;
        top: -30px;
    }
    /*.search-title::before {*/
        /*content: '';*/
        /*display: block;*/
        /*height: 16px;*/
        /*width: 2px;*/
        /*background-color: #88B7E0;*/
        /*position: absolute;*/
        /*left: 5px;*/
        /*top: 11px;*/
    /*}*/
    .search-right {
        top: -6px;
        right: 0px;
        position: absolute;
    }
    .ivu-tabs-bar {
         border-bottom: 0 none;
         margin-bottom: 0px;
    }
    .ivu-tabs-bar .ivu-tabs-nav-container {
        margin-bottom: -1px;
        line-height: 2.5;
        font-size: 14px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        zoom: 1;
    }


</style>
<script>
    // 导入部署单元子组件
    import deployUnit from './subcomponents/deployUnit.vue';
    import container from './subcomponents/container.vue';
    import mysql from './subcomponents/mysql.vue';
    import redis from './subcomponents/redis.vue';
    import mongodb from './subcomponents/mongodb.vue';
    import common from '../../../../tools/common.js'
    export default {
        // 默认请求部署单元的数据
        mounted() {
           this.getData(common.apihost+'bench/source_unit');
        },
        data () {
            return {
              
            }

        },
        methods: {
            // 获取被点击的tab的数据
            getData (url) {
                this.$http.get(url)
                        .then(response => {
                            console.log(response);
                            if (response.body.code === 2002) { // 请求成功
                                datas= response.body.result.res;
                                // 保存数据到状态池
                                this.$store.commit('getResourceData',datas);
                                console.log(this.$store.state.resourceData.datas);
                            }
                       });
            },
            // 获取点击tab触发的值
            getTabName (name) {
                console.log(name);
                let url=""
                // 根据不同的name，请求不同的数据
                switch (name) {
                    case "deployUnit":
                        url=common.apihost+'bench/source_unit';
                        this.getData(url);
                        break;
                }
            }
        },
        components: {
            deployUnit,
            container,
            mysql,
            redis,
            mongodb
        }
    }
</script>