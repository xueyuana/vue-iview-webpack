<template>
    <div class="my-resource">
        <div class="search-title">
            <div class="search-form">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <Row>
                        <Col span="6">
                            <Form-item label="实例类型" prop="resource_type">
                                <Input v-model="formValidate.resource_type" placeholder="请输入"></Input>
                            </Form-item>

                            <Form-item label="实例名称" prop="resource_name">
                                <Input v-model="formValidate.resource_name" placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="部署单元名称" prop="item_name">
                                <Input v-model="formValidate.item_name" placeholder="请输入"></Input>
                            </Form-item>
                            <Form-item label="部署单元编号" prop="item_code">
                                <Input v-model="formValidate.item_name" placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="创建日期"  prop="create_date">
                                <Date-picker type="datetime" placeholder="选择日期"
                                               v-model="formValidate.create_date"></Date-picker>
                            </Form-item>

                            <Form-item label="状态" prop="resource_status">
                                <Select v-model="formValidate.resource_status" placeholder="状态">
                                    <Option value="running">运行中</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item>
                                <Button type="primary" @click="goSearch">查询</Button>
                            </Form-item>
                            <Form-item>
                                <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>

            </div>
        </div>
        <div class="search-result">
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
                        <td>{{data.resource_type}}</td>
                        <td>{{data.resource_name}}</td>
                        <td>{{data.item_name}}</td>
                        <td>{{data.item_code}}</td>
                        <td>{{data.create_date}}</td>
                        <td>{{data.resource_ip}}</td>
                        <td>{{data.resource_status}}</td>
                        <td>
                            <span v-for="configObj in data.resource_config" :key="configObj">
                                {{ configObj.name}} : {{configObj.value}}
                                <br>
                            </span>
                        </td>
                        <td>
                            <Button type="primary" size="small">查看详情</Button>
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

</template>

<style scoped>
    .my-resource {
        padding-top: 15px;
    }
    .search-title {
        padding-top: 15px;
        background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
        border: 1px solid rgb(228, 228, 228);
        border-radius: 10px;
    }

    .search-result {
        padding: 20px 20px;
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
    import common from '../../../../tools/common.js';
    export default {
        data () {
            return {
                // 查询表单数据
                formValidate: {
                    resource_type: '',
                    resource_name: '',
                    item_name: '',
                    item_code: '',
                    create_date: '',
                    resource_status: ''
                },
                ruleValidate: {
                    resource_type: [],
                    resource_name: [],
                    item_name: [],
                    item_code: [],
                    create_date: [],
                    resource_status: []
                },

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
                        title: '实例类型',
                        key: 'resource_type'
                    },
                    {
                        title: '实例名称',
                        key: 'resource_name'
                    },
                    {
                        title: '所属部署单元名称',
                        key: 'item_name'
                    },
                    {
                        title: '所属部署单元编号',
                        key: 'item_code'
                    },
                    {
                        title: '创建日期',
                        key: 'create_date'
                    },
                    {
                        title: 'IP',
                        key: 'resource_ip'
                    },
                    {
                        title: '状态',
                        key: 'resource_status'
                    },
                    {
                        title: '配置',
                        key: 'resource_config'
                    },

                    {
                        title: '操作',
                        key: 'action'
                    }
                ],

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
            // 搜索查询
            goSearch  () {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));

                // const url = common.apihost + 'iteminfo/iteminfoes/project_item';
                const url = '/static/json/myResource/myResource.json'
                // 查询条件
                let query = {};

                if (!userInfo.is_admin) { //普通用户
                    query.user_id=userInfo.user_id; // 默认按照登录用户进行查询
                }

                console.log(query);

                this.$http.get(url, {params: query})
                        .then(response => {
                                console.log(response);
                                if (response.body.code === 200) { // 请求成功
                                    let backDatas = response.body.result.res;
                                    this.data1 = backDatas;
                                    this.filterDate = this.mockTableData(backDatas, this.pageSize, 1);
                                }
                        });
            },

            // 重置
            handleReset (name) {
                this.$refs[name].resetFields();
            },

            //实现分页  改变后的页码
            changePage (page) {
                console.log(page);
                this.filterDate = this.mockTableData(this.data1, this.pageSize, page);
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
                        item_code: originData[i].item_code,
                        resource_type: originData[i].resource_type,
                        resource_name: originData[i].resource_name,
                        resource_ip: originData[i].resource_ip,
                        resource_status: originData[i].resource_status,
                        resource_config: originData[i].resource_config,
                    })
                }
                return data;
            }
        }
    }
</script>