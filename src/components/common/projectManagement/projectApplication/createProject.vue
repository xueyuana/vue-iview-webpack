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

                    ],
                    project_code: [

                    ],
                    project_desc: [

                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                let self=this;
                self.$refs[name].validate((valid) => {
                    if (valid) {
                        // 1.0 将表单数据提交到后台
                        let property_list=[
                            {
                                type: "string",
                                name: "项目名称",
                                value: self.formValidate.project_name
                            },
                            {
                                type: "string",
                                name: "项目编码",
                                value: self.formValidate.project_code
                            },
                            {
                                type: "string",
                                name: "归属部门",
                                value: "运维部"
                            },
                            {
                                type: "string",
                                name: "项目描述",
                                value: self.formValidate.project_desc
                            },
                            {
                                type: "string",
                                name: "创建人",
                                value: '张三'
                            }
                        ];
                        let newProject={
                            // 暂时设置为用户所填的项目名称  不能重复
                            name:self.formValidate.project_name,
                            property_list: property_list
                        };

                        newProject=JSON.stringify(newProject);
                        console.log(newProject);

                        const url=common.apihost+'iteminfo/iteminfoes';

                        self.$http.post(url,newProject,{emulateJSON:true})
                                .then(response=>{ //提交成功
                                       console.log(response);
                                       if(response.body.code===2002) {
                                           console.log(response.body.result.msg);
                                           // 2.0 跳转到项目查询页面
                                           self.$router.push({name: 'pro_applicationHistory'});
                                           // 3.0 修改面包屑导航的数据 修改侧边导航的默认选项
//                                           self.$router.go(0);

                                           self.$store.commit('getActiveItem',{
                                               openNames:'1',  // Submenu
                                               activeName:'12'  //Menu-item
                                           });

                                           self.$store.commit('getLevel',{
                                               level_1: this.$store.state.breadcrumbData.level.level_1,
                                               level_2: '项目查询'
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