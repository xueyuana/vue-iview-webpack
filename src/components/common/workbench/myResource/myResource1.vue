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
                            <div class="public-content">
                                <!--部署单元内容-->
                                <div class="table-search clearfix">
                                    <div class="search-select fl">
                                        <Select v-model="selectedValue" style="width:200px" @on-change="getSelectedValue" :label-in-value="true">
                                            <Option v-for="item in selectList" :value="item.value" :label="item.label" :key="item"></Option>
                                        </Select>
                                    </div>
                                    <div class="search-input fl">
                                        <Input v-model="inputValue" :placeholder="placeholderValue" style="width: 300px"></Input>
                                    </div>
                                    <div class="search-btn fl">
                                        <Button type="primary" icon="ios-search" @click="goSearch">搜索</Button>
                                    </div>
                                </div>
                                <div class="table-content">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th v-for="column in columns" :key="column.key">{{column.title}}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(data,index) in filterDate" :key="data">
                                            <td>{{ index+1 }}</td>
                                            <!--<td><a href="#">{{data.item_name}}</a></td>-->
                                            <td>{{data.item_name}}</td>
                                            <td>{{data.create_date}}</td>
                                            <td>{{data.user}}</td>
                                            <td>{{data.item_code}}</td>
                                            <td>{{data.item_depart}}</td>
                                            <td>
                                                <Button type="primary">查看详情</Button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <!--分页-->
                                    <div style="margin: 10px;overflow: hidden">
                                        <div style="float: right;">
                                            <Page
                                                    :total="this.data1.length"
                                                    :page-size="pageSize"
                                                    :current="1"
                                                    show-sizer
                                                    show-total
                                                    @on-change="changePage"
                                                    @on-page-size-change="changePageSize"
                                            ></Page>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        position: absolute;
        font-weight: 700;
        top: -30px;
    }

    .search-right {
        top: -6px;
        right: 0px;
        position: absolute;
    }


    .public-content {
        min-height: 500px;
    }
    .search-input {
        margin: 0 10px;
    }
    .table-content {
        margin-top: 20px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    table td, table th{
        text-align: center;
        border: 1px solid #D7DDE4;
    }

    table tr {

        border: 1px solid #D7DDE4;
    }

    table thead tr {
        height: 40px;
        background-color: #F5F7F9;
    }
    table tbody tr {
        height: 48px;
    }
    table tbody tr:hover {
        background-color: #F3FAFF;
    }

</style>
<script>
    // 导入部署单元子组件
    import deployUnit from './subcomponents/deployUnit.vue';
    import container from './subcomponents/container.vue';
    import mysql from './subcomponents/mysql.vue';
    import redis from './subcomponents/redis.vue';
    import mongodb from './subcomponents/mongodb.vue';
    import common from '../../../../tools/common.js';
    export default {
        data () {
            return {
                // 部署单元数据
                // 搜索输入框内容
                inputValue:'',
                // 下拉列表内容 便于查询
                selectList: [
                    {
                        value: 'item_name',
                        label: '部署单元名称'
                    },
                    {
                        value: 'start_time',
                        label: '创建日期'
                    },
                    {
                        value: 'user_name',
                        label: '创建人'
                    },
                    {
                        value: 'item_code',
                        label: '部署单元编号'
                    },
                    {
                        value: 'item_depart',
                        label: '归属部门'
                    }
                ],
                // 下拉列表选中的值
                selectedValue: '',
                // 搜索输入框的值
                placeholderValue:'请输入',

                // 表格数据
                columns: [
                    {
                        title: '序号',
                        key: 'identifier'
                    },
                    {
                        title: '部署单元名称',
                        key: 'item_name'
                    },
                    {
                        title: '创建日期',
                        key: 'create_date'
                    },
                    {
                        title: '创建人',
                        key: 'user'
                    },
                    {
                        title: '部署单元编号',
                        key: 'item_code'
                    },
                    {
                        title: '归属部门',
                        key: 'item_depart'
                    },
                    {
                        title: '操作',
                        key: 'action'
                    }
                ],
//                datas:[
//                    {
//                        project_name: '企通签到',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'qitong-0001',
//                        department: '应用统筹部'
//                    },
//                    {
//                        project_name: '用户中心1',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'user-0001',
//                        department: '应用统筹部'
//                    },
//                    {
//                        project_name: '用户中心2',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'user-0002',
//                        department: '应用统筹部'
//                    },
//                    {
//                        project_name: '用户中心3',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'user-0003',
//                        department: '应用统筹部'
//                    }
//
//                ],
                // 分页数据
                data1: [],
                filterDate: [],
                pageSize: 10
              
            }

        },
        // 默认请求部署单元的数据
        mounted() {
            this.goSearch();
        },
        methods: {
            // 下拉框的值发生改变的时候触发
            getSelectedValue (selectedObj) {
                console.log(selectedObj);
                this.placeholderValue="请输入"+selectedObj.label+"查询";
                this.inputValue='';
            },

            // 搜索查询
            goSearch  () {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));

                const url = common.apihost + 'iteminfo/iteminfoes/project_item';
                // 查询条件
                let query = {};

                if (!userInfo.is_admin) { //普通用户
                    query.user_id=userInfo.user_id; // 默认按照登录用户进行查询
                }

                this.inputValue && (query[this.selectedValue] = this.inputValue);

                console.log(query);

                this.$http.get(url, {params: query})
                        .then(response => {
                                console.log(response);
                                if (response.body.code === 200) { // 请求成功
                                    let backDatas = response.body.result.res;
                                    this.data1 = backDatas;
                                    this.filterDate = this.mockTableData(backDatas, this.pageSize, 1)
                                    this.$store.commit('getOriginData', this.filterDate);
                                }
                        });
            },

            //实现分页  改变后的页码
            changePage (page) {
                console.log(page);
                this.filterDate = this.mockTableData(this.data1, this.pageSize, page);
                this.$store.commit('getOriginData', this.filterDate);
            },

            // 返回切换后的每页条数
            changePageSize (pageSize) {
                console.log(pageSize);
                this.pageSize = pageSize;
                this.changePage(1);
            },
            // 构造删选之后的数据
            mockTableData (originData, pageSize, index) {
                let data = [];
                let num = (index - 1) * pageSize;
                let maxNum = (num + pageSize) > this.data1.length ? this.data1.length : (num + pageSize);
                for (let i = num; i < maxNum; i++) {
                    data.push({
                        item_name: originData[i].item_name,
                        create_date: originData[i].create_date.substring(0, 16),
                        user: originData[i].user,
                        item_code: originData[i].item_code,
                        item_depart: originData[i].item_depart
                    })
                }
                return data;
            },

            getResourceData (url) {
                this.$http.get(url)
                        .then(response => {
                             console.log(response);
                            if (response.body.code === 200) { // 请求成功
                                let backDatas = response.body.result.res;
                            }
                       });
            },

            // 获取点击tab触发的值
            getTabName (name) {
                console.log(name);
                let url="";
                // 根据不同的name，请求不同的数据
                switch (name) {
                    case "deployUnit":
                        url=common.apihost+'iteminfo/iteminfoes/project_item';
                        break;
                    case "container":
                        url=common.apihost+'res_callback/res';
                        this.getResourceData(url);
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