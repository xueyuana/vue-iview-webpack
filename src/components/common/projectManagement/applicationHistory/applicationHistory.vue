
<template>
  <div>
        <div class="search-title">
            <div class="search-form">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <Col span="6">
                            <Form-item label="创建人" prop="creator">
                                <Input v-model="formValidate.creator" placeholder="请输入"></Input>
                            </Form-item>
                            <Form-item label="归属部门" prop="department">
                                <Select v-model="formValidate.department" placeholder="请选择归属部门">
                                    <Option value="beijing">大数据部</Option>
                                    <Option value="shanghai">运维部</Option>
                                    <Option value="shenzhen">云服务</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="创建日期">
                                <Row>
                                    <Col span="11">
                                    <Form-item prop="create_date_begin">
                                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.create_date_begin"></Date-picker>
                                    </Form-item>
                                    </Col>
                                    <Col span="2" style="text-align: center">至</Col>
                                    <Col span="11">
                                    <Form-item prop="create_date_end">
                                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.create_date_end"></Date-picker>
                                    </Form-item>
                                    </Col>
                                </Row>
                            </Form-item>

                            <Form-item label="项目编号" prop="project_code">
                                <Input v-model="formValidate.project_code" placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="项目名称" prop="project_name">
                                <Input v-model="formValidate.project_name" placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item>
                                <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
                                <Button type="ghost" @click="handleReset('formValidate')" style="margin-top: 24px">重置</Button>
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
                    <tr v-for="(data,trIndex) in $store.state.projectInfo.projectList" :key="data">
                        <td>{{trIndex+1}}</td>
                        <td>{{data.item_name}}</td>
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
                            :total="$store.state.projectInfo.projectList.length"
                            :page-size="10"
                            :current="1"
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
    table thead tr{
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
                    create_date_begin:'',
                    create_date_end:'',
                    project_name:'',
                    department: '',
                    project_code:''
                },
                ruleValidate: {
                    creator: [

                    ],
                    create_date_begin: [

                    ],
                    create_date_end:[

                    ],
                    project_name: [

                    ],
                    department: [

                    ],
                    project_code:[]
                },
                // 表格数据
                columns: [
                    {
                        title: '编号',
                        key: 'identifier'
                    },
                    {
                        title: '项目名称',
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
                        title: '项目编号',
                        key: 'project_code'
                    },
                    {
                        title: '归属部门',
                        key: 'department'
                    }
                ]
//                datas: [
//
//                    {
//                        project_name: '项目一',
//                        create_date: '2017-5-18',
//                        creator:'xxx',
//                        project_code: '00001',
//                        department:'引用统筹部'
//                    },
//                    {
//                        project_name: '项目二',
//                        create_date: '2017-5-18',
//                        creator:'xxx',
//                        project_code: '00001',
//                        department:'引用统筹部'
//                    },
//                    {
//                        project_name: '项目三',
//                        create_date: '2017-5-18',
//                        creator:'xxx',
//                        project_code: '00001',
//                        department:'引用统筹部'
//                    }
//                ]
            }

        },

        methods: {
            // 提交删选条件
            handleSubmit (name) {
                console.log(this.formValidate);
//
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const url=common.apihost+'iteminfo/iteminfoes/';
//                     
                        let query={
                            user_name: this.formValidate.creator,
                            start_time: this.formValidate.create_date_begin,
                            end_time: this.formValidate.create_date_end,
                            item_name: this.formValidate.project_name,
                            depart: this.formValidate.department,
                            item_code: this.formValidate.project_code
                        };
                        this.$http.get(url,{params:query})
                                .then(response => {
                                    console.log(response);
                                    if(response.body.code===200) { // 请求成功
                                        //  将项目信息列表 保存到状态池
                                        let backDatas=response.body.result.res;

                                    }
                                });
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

            //实现分页  改变后的页码
            changePage (page) {
                console.log(page);
            },

            // 返回切换后的每页条数
            changePageSize (pageSize) {
               console.log(pageSize);
            }


        }
    }
</script>

