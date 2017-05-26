<template>
    <div>
        <div class="search-title">
            <div class="search-form">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <Row>
                        <Col span="10">
                        <Form-item label="创建人" prop="creator">
                            <Input v-model="formValidate.creator" placeholder="请输入"></Input>
                        </Form-item>

                        <Form-item label="部署单元名称" prop="project_name">
                            <Input v-model="formValidate.project_name" placeholder="请输入"></Input>
                        </Form-item>
                        </Col>
                        <Col span="10">
                        <Form-item label="创建日期">
                            <Row>
                                <Col span="11">
                                <Form-item prop="create_date_begin">
                                    <Date-picker type="datetime" placeholder="选择日期"
                                                 v-model="formValidate.create_date_begin"></Date-picker>
                                </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center">
                                至</Col>
                                <Col span="11">
                                <Form-item prop="create_date_end">
                                    <Date-picker type="datetime" placeholder="选择日期"
                                                 v-model="formValidate.create_date_end"></Date-picker>
                                </Form-item>
                                </Col>
                            </Row>
                        </Form-item>

                        <Form-item label="部署单元编号" prop="project_code">
                            <Input v-model="formValidate.project_code" placeholder="请输入"></Input>
                        </Form-item>

                        </Col>
                        <Col span="4">
                        <Form-item>
                            <Button type="primary" @click="goQuery">查询</Button>
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-top: 24px">重置
                            </Button>
                        </Form-item>
                        </Col>
                    </Row>
                </Form>

            </div>

        </div>
        <div class="project-history">
            <table>
                <thead>
                <tr>
                    <th v-for="column in columns" :key="column.key">{{column.title}}</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="(data,trIndex) in filterDate" :key="data">
                    <td>{{trIndex+1}}</td>
                    <td><a href="#">{{data.item_name}}</a></td>
                    <td>{{data.create_date}}</td>
                    <td>{{data.user}}</td>
                    <td>{{data.item_code}}</td>
                    <td>{{data.item_depart}}</td>
                </tr>
                </tbody>

            </table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page
                            :total="this.data1.length"
                            :page-size="pageSize"
                            :current="1"
                            show-total
                            show-sizer
                            @on-change="changePage"
                            @on-page-size-change="changePageSize"
                    ></Page>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
    .search-title {
        padding-top: 15px;
        background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
        border: 1px solid rgb(228, 228, 228);
        border-radius: 10px;
    }

    .project-history {
        padding: 20px 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table td {
        text-align: center;
    }

    table tr {
        height: 50px;
        border: 1px solid #D7DDE4;
    }

    table thead tr {
        background-color: #F5F7F9;
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
                    creator: '',
                    create_date_begin: '',
                    create_date_end: '',
                    project_name: '',
                    project_code: ''
                },
                ruleValidate: {
                    creator: [],
                    create_date_begin: [],
                    create_date_end: [],
                    project_name: [],
                    project_code: []
                },
                // 表格数据
                columns: [
                    {
                        title: '编号',
                        key: 'identifier'
                    },
                    {
                        title: '部署单元名称',
                        key: 'project_name'
                    },
                    {
                        title: '创建日期',
                        key: 'create_date'
                    },
                    {
                        title: '创建人',
                        key: 'creator'
                    },
                    {
                        title: '部署单元编号',
                        key: 'project_code'
                    },
                    {
                        title: '归属部门',
                        key: 'department'
                    }
                ],

                data1: [],
                filterDate: [],
                pageSize: 10
            }

        },
        mounted() {
            this.goQuery()
        },
        methods: {
            // 提交删选条件
            goQuery () {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));

                const url = common.apihost + 'iteminfo/iteminfoes/project_item';
                // 查询条件
                let query = {};

                if (!userInfo.is_admin) { //普通用户
                    query.user_id=userInfo.user_id; // 默认按照登录用户进行查询
                }

                this.formValidate.creator && (query.user_name = this.formValidate.creator);
                this.formValidate.create_date_begin && (query.start_time = this.formValidate.create_date_begin);
                this.formValidate.create_date_end && (query.end_time = this.formValidate.create_date_end);
                this.formValidate.project_name && (query.item_name = this.formValidate.project_name);
                this.formValidate.project_code && (query.item_code = this.formValidate.project_code);

                console.log(query)

                this.$http.get(url, {params: query})
                        .then(response => {
                               console.log(response);
                                if (response.body.code === 200) { // 请求成功
                                    let backDatas = response.body.result.res;
                                    this.data1 = backDatas;

                                    this.filterDate = this.mockTableData(backDatas, this.pageSize, 1)
                                }
                        });
            },

            handleReset (name) {
                this.$refs[name].resetFields();
            },


            //实现分页  改变后的页码
            changePage (page) {
                console.log(page);
                this.filterDate = this.mockTableData(this.data1, this.pageSize, page)
            },

            // 返回切换后的每页条数
            changePageSize (pageSize) {
                console.log(pageSize);

                this.pageSize = pageSize
                this.changePage(1)
            },
            // 构造删选之后的数据
            mockTableData (originData, pageSize, index) {
                let data = [];
                let num = (index - 1) * pageSize
                let maxNum = (num + pageSize) > this.data1.length ? this.data1.length : (num + pageSize)
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
            }


        }
    }
</script>

