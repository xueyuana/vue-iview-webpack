<template>
    <div class="create-project">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="form-main">
                <div class="submit">
                    <Form-item>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-right: 10px">取消</Button>
                        <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
                    </Form-item>
                </div>
                <div class="project-info">
                    <div class="info-title">
                        <p>项目信息：</p>
                    </div>
                    <div class="project-mian">
                        <div class="project-top clearfix">
                            <div class="project-name fl">
                                <Form-item label="项目名称" prop="project_name">
                                    <Input v-model="formValidate.project_name" placeholder="请输入项目名称"></Input>
                                </Form-item>
                            </div>
                            <div class="project-id fr">
                                <Form-item label="项目编号" prop="project_code">
                                    <Input v-model="formValidate.project_code" placeholder="请输入项目编号"></Input>
                                </Form-item>
                            </div>
                        </div>
                        <div class="project-des">
                            <Form-item label="项目描述" prop="project_desc">
                                <Input v-model="formValidate.project_desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
                            </Form-item>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </div>
</template>

<style scoped>
    .submit {
        text-align: right;
    }
    .info-title {
        height: 20px;
        line-height: 20px;
        background-color: #3399FF;
        color: #fff;
        padding-left: 10px;
    }
    .project-top,.project-des{
        padding: 0 100px;
    }

    .project-mian {
        margin-top: 20px;
    }

</style>
<script>
    import common from '../../../../tools/common.js';

    import {userinfo} from '../../../../tools/user.js';

    export default {
        data () {
            return {
                formValidate: {
                    project_name: '',
                    project_code: '',

                    project_desc: ''
                },
                ruleValidate: {
                    project_name: [
                        {required: true, message: '项目名称不能为空', trigger: 'blur' }
                    ],
                    project_code: [
                        {required: true, message: '项目编号不能为空', trigger: 'blur' }
                    ],
                    project_desc: [

                    ]
                }
            }
        },
        methods: {
            // 获取项目信息的方法
            getProjectInfo () {
                let self=this;
                const url=common.apihost+'iteminfo/iteminfoes/'+"test1";
                self.$http.get(url)
                        .then(response => {
                                console.log(response);
                                if(response.body.code===200) { // 请求成功
                                    //  将项目信息列表 保存到状态池
                                    let backDatas=response.body.result.res;
                                    self.$store.commit("getProjectList",backDatas);
                                    console.log(self.$store.state.projectInfo.projectList);
                                }
                        });
            },

            handleSubmit (name) {
                let self=this;
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        // 1.0 将表单数据提交到后台
                        let newProject={
                            user_id : userinfo.user_id ,
                            user_name : userinfo.username,
                            item_name : self.formValidate.project_name,
                            item_code : self.formValidate.project_code,
                            item_department  : userinfo.department,
                            item_description : self.formValidate.project_desc
                        };

                        newProject=JSON.stringify(newProject);
                        console.log(newProject);

                        const url=common.apihost+'iteminfo/iteminfoes';

                        self.$http.post(url,newProject,{emulateJSON:true})
                                .then(response=>{ //提交成功
                                       console.log(response);
                                       if(response.body.code===2002) {

                                           // 2.0 跳转到项目查询页面
                                           self.$router.push({name: 'pro_applicationHistory'});

                                           // 3.0 修改面包屑导航的数据 修改侧边导航的默认选项
                                              // 3.0.1  请求项目信息
                                           if(window.location.hash==="#/"+'pro_application_history') { //项目查询
                                               self.getProjectInfo();
                                           }
                                              // 3.0.2  修改激活项
                                           self.$store.commit('getActiveItem',{
                                               openNames:'1',  // Submenu
                                               activeName:'12'  //Menu-item
                                           });
                                               // 3.0.3  修改面包屑导航数据
                                           self.$store.commit('getLevel',{
                                               level_1: this.$store.state.breadcrumbData.level.level_1,
                                               level_2: '部署单元查询'
                                           });
                                       }else if(response.body.code===2017) { // 模型已经存在
                                           self.$Notice.error({
                                               title: response.body.result.msg,
                                               desc: ''
                                           });
                                       }
                                });
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }


</script>