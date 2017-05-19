
<template>
  <div>
        <div class="search-title">
            <div class="search-form">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <Col span="6">
                            <Form-item label="创建人" prop="creator">
                                <Input v-model="formValidate.creator"></Input>
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
                                <Input v-model="formValidate.project_code"></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="项目名称" prop="project_name">
                                <Input v-model="formValidate.project_name"></Input>
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
                    <tr v-for="data in $store.state.projectInfo.projectList" :key="data">
                        <td v-for="columnObj in data.column">{{columnObj.value}}</td>
                        <!--<td>-->
                            <!--<a href="#"  style="text-decoration:underline">{{data.project_name}}</a>-->
                        <!--</td>-->
                        <!--<td>{{data.create_date}}</td>-->
                        <!--<td>{{data.creator}}</td>-->
                        <!--<td>{{data.project_code}}</td>-->
                        <!--<td>{{data.department}}</td>-->
                    </tr>
                </tbody>

            </table>
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
                ],
                datas: [

                    {
                        project_name: '项目一',
                        create_date: '2017-5-18',
                        creator:'xxx',
                        project_code: '00001',
                        department:'引用统筹部'
                    },
                    {
                        project_name: '项目二',
                        create_date: '2017-5-18',
                        creator:'xxx',
                        project_code: '00001',
                        department:'引用统筹部'
                    },
                    {
                        project_name: '项目三',
                        create_date: '2017-5-18',
                        creator:'xxx',
                        project_code: '00001',
                        department:'引用统筹部'
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

