<template>
    <div>
        <!--概况-->
        <div class="survey">
            <div  class="title">
                <span>概况</span>
            </div>
            <div class="survey-list">
                <Row :gutter="24">
                    <Col span="6">
                    <div class="deployment public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-server" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">部署单元</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    </Col>
                    <Col span="6">
                    <div class="computer public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-cubes" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">计算实例</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                                <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>

                    </div>
                    </Col>
                    <Col span="6">
                    <div class="database public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-database" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">数据库实例</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                               <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    </Col>
                    <Col span="6">
                    <div class="cache public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <i class="fa fa-hdd-o" aria-hidden="true"></i>
                            </div>
                            <div class="top_right fr">
                                <div class="count">2</div>
                                <div class="name">缓存实例</div>
                            </div>
                        </div>
                        <div class="bottom clearfix">
                            <span class="fl">查看详情</span>
                            <span class="arrow fr">
                               <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>

        <!--待审批列表-->
        <div class="approved">
            <div class="approved-title">
                <p>
                    <span>待审批列表</span>
                </p>
            </div>
            <div class="approved-search">
                <div class="search-form">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                        <Row>
                            <Col span="10">
                                <Form-item label="发起人" prop="creator">
                                    <Input v-model="formValidate.creator" placeholder="请输入"></Input>
                                </Form-item>

                                <Form-item label="部署单元名称" prop="project_name">
                                    <Input v-model="formValidate.project_name" placeholder="请输入"></Input>
                                </Form-item>
                            </Col>

                            <Col span="10">
                                <Form-item label="发起日期">
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
                                    <Select v-model="formValidate.approval_status" placeholder="审批状态" @on-change="getApprovalStatus">
                                        <Option value="unapproved">未审批</Option>
                                        <Option value="approved">审批完成</Option>
                                    </Select>
                                </Form-item>
                            </Col>

                            <Col span="4">
                                <Form-item>
                                    <Button type="primary" @click="goQuery">查询</Button>
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
                        <tr v-for="(dataObj,index) in filterDate" :key="dataObj">
                            <td>{{ index+1 }}</td>
                            <td>{{ dataObj.name }}</td>
                            <td>{{ dataObj.date }}</td>
                            <td>{{ dataObj.project }}</td>
                            <td>{{ dataObj.approval_status }}</td>
                            <td>
                                <Button type="primary" @click="goCheck(dataObj.id)">查看</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>

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

    </div>
</template>

<style scoped>
    /*概况*/
    .survey .title {
        background-color: #0AB7E9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .survey .survey-list {

    }
    .survey-list {
        margin-top: 10px;
    }
    .survey-list h3 {
        padding: 5px 10px;
        background-color: #D7D7D7;
    }
    .survey-list li {
        margin: 10px 0px;
    }

    .public .top {
        height: 100px;
        background-color: #00CCFF;
        padding: 0 10px;
        color: #333333;
        border-radius: 4px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    .public .bottom {
        height: 40px;
        line-height: 40px;
        border: 1px solid #aaa;
        padding: 0 10px;
        cursor: pointer;
        border-radius: 4px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .top .top_left {
        font-size: 40px;
        line-height: 100px;

    }
    .top .top_right {
        font-size: 16px;
        text-align: center;
        margin-top: 20px;
    }
    .top_right .name {
        margin-top: 20px;
    }
    .bottom {
        color: #333333;
    }
    .bottom .arrow {
        font-size: 18px;
    }

    /*待审批列表*/
    .approved {
        margin-top: 20px;
    }
    .approved-search {
        padding-top: 15px;
        background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
        border: 1px solid rgb(228, 228, 228);
        border-radius: 10px;
    }
    .approved-title {
        background-color: #0AB7E9;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
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
        /*border: 1px solid #D7DDE4;*/
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
    import common from '../../../tools/common.js';
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
                    approval_status:'unapproved', // 默认显示未审批
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
                        title: '编号',
                        key: 'identifier'
                    },
                    {
                        title: '发起人',
                        key: 'applicant'
                    },
                    {
                        title: '发起日期',
                        key: 'application_date'
                    },
                    {
                        title: '部署单元名称',
                        key: 'project_name'
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
                // 获取审批状态
                selectedStatus:'unapproved',

                // 保存未审批的数据
                data1: [],
                filterDate: [],
                pageSize: 10
            }
        },

        mounted() {
            this.goQuery();
        },

        methods: {
            // 获取审批状态
            getApprovalStatus (approval_status) {
               console.log(approval_status);
                this.selectedStatus=approval_status;
            },
            // 提交删选条件
            goQuery () {
                // 获取审批状态

                let userInfo = JSON.parse(localStorage.getItem('userInfo'));

                const url = common.apihost + 'resource/';
                // 查询条件
                let query = userInfo.user_id;

                this.$http.get(url, {params: query})
                        .then(response => {
                                console.log(response);
                                if (response.body.code === 200) { // 请求成功
                                    let backDatas = response.body.result.msg;
                                    // 每次请求的时候，清空data1的值
                                    this.data1=[];

                                    for(let i=0;i<backDatas.length;i++) {
                                        let backDataObj=backDatas[i];

                                        if(this.selectedStatus==="unapproved") { //查询未审批的
                                            if(backDataObj.approval_status==="未审批") {
//                                                backDataObj.approval_status="未审批";
                                                this.data1.push(backDataObj);
                                            }
                                        }else if(this.selectedStatus==="approved"){ //查询已经审批的
                                            if(backDataObj.approval_status==="审批完成") {
//                                                backDataObj.approval_status="审批完成";
                                                this.data1.push(backDataObj);
                                            }
                                        }
                                    }
                                    this.filterDate = this.mockTableData(this.data1, this.pageSize, 1);
                                }
                        });
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
                        name: originData[i].name,
                        date: originData[i].date.substring(0, 16),
                        project: originData[i].project, //部署单元名称
                        resource: originData[i].resource, // 资源名称
                        approval_status: originData[i].approval_status,
                        id: originData[i].id
                    });
                }
                return data;
            },

            handleReset (name) {
                this.$refs[name].resetFields();
            },

            // 跳转到资源审批页面
            goCheck (id) {
                console.log(id);
                this.$router.push({name: 'res_applicationCheck',query: { id: id}});
            }
        }
    }
</script>