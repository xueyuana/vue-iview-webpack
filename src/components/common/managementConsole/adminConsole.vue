<template>
    <div>
        <div class="asset-profile">
            <div  class="title">
                <span>资产概况</span>
            </div>
            <div class="asset-list">
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

        <!--待审批列表-->
        <div class="approved">
            <div class="approved-title">
                <p>
                    <Icon type="ios-circle-filled"></Icon>
                    <span>待审批列表</span>
                </p>
            </div>
            <div class="approved-search">
                <div class="search-form">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <Row>
                            <Col span="6">
                            <Form-item label="创建人" prop="creator">
                                <Input v-model="formValidate.creator"></Input>
                            </Form-item>
                            <Form-item label="资源名称" prop="resource_name">
                                <Input v-model="formValidate.resource_name"></Input>
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

                            <Form-item label="审批状态" prop="approval_status">
                                <Select v-model="formValidate.approval_status" placeholder="审批状态">
                                    <Option value="approving">审批中</Option>
                                    <Option value="approved">审批完成</Option>
                                    <Option value="no_exist">流程不存在</Option>
                                </Select>
                            </Form-item>
                            </Col>
                            <Col span="6">
                                <Form-item label="项目名称" prop="project_name">
                                    <Input v-model="formValidate.project_name"></Input>
                                </Form-item>
                                <Form-item label="归属部门" prop="department">
                                    <Select v-model="formValidate.department" placeholder="请选择归属部门">
                                        <Option value="beijing">大数据部</Option>
                                        <Option value="shanghai">运维部</Option>
                                        <Option value="shenzhen">云服务</Option>
                                    </Select>
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
            <div class="approved-list">

                <table>
                    <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.key">{{column.title}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="data in datas" :key="data">
                        <td>{{data.applicant}}</td>
                        <td>{{data.application_date}}</td>
                        <td>{{data.project_name}}</td>
                        <td>{{data.resource_name}}</td>
                        <td>{{data.approval_status}}</td>
                        <td>
                            <Button type="primary">查看</Button>
                        </td>
                    </tr>
                    </tbody>

                </table>

            </div>
        </div>

    </div>
</template>

<style scoped>
    .asset-profile .title {
        background-color: #0AB7E9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        width: 80px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .asset-profile .asset-list {
        border: 1px solid #797979;
    }
    .asset-list {
        margin-top: 10px;
    }
    .asset-list h3 {
        padding: 5px 10px;
        background-color: #D7D7D7;
    }
    .asset-list li {
        margin: 10px 0px;
    }
    .res-count {
        margin-left: 5px;
        text-decoration: underline;
    }
    .approved-search {
        padding-top: 15px;
        background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
        border: 1px solid rgb(228, 228, 228);
        border-radius: 10px;
    }
    .approved-title {
        height: 30px;
        line-height: 30px;
        border: 1px solid #E4E4E4;
        margin-top: 30px;
        margin-bottom: 10px;
        padding: 0 8px;
        color: #0AB7E9;
        font-weight: 700;
    }
    .approved-list {
        padding: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }
    table td, table th{
        text-align: center;
        border: 1px solid #D7DDE4;
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
                    approval_status:'',
                    resource_name:''
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
                        title: '发起人',
                        key: 'applicant'
                    },
                    {
                        title: '发起日期',
                        key: 'application_date'
                    },
                    {
                        title: '项目名称',
                        key: 'project_name'
                    },
                    {
                        title: '资源名称',
                        key: 'resource_name'
                    },
                    {
                        title: '审批状态',
                        key: 'approval_status'
                    },
                    {
                        title: '操作',
                        key: 'action'
                    }
                ],
                datas: [
                    {
                        applicant: 'xxx',
                        application_date: '2017-5-18',
                        project_name:'群组',
                        resource_name:'部署资源',
                        approval_status: '待审批'
                    },
                    {
                        applicant: 'xxx',
                        application_date: '2017-5-18',
                        project_name:'圈子',
                        resource_name:'创建REDIS',
                        approval_status: '待审批'
                    },
                    {
                        applicant: 'xxx',
                        application_date: '2017-5-18',
                        project_name:'圈子',
                        resource_name:'创建MYSQL',
                        approval_status: '审批完成'
                    }
                ]
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
            }
            })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>