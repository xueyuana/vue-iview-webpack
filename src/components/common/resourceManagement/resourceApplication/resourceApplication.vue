<!--资源申请-->
<template>
    <div class="addres-wrap">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <div class="addres-top clearfix">
                <Button id="returnButton" ><a href="" style="color: #fff">返回</a> </Button>
                <Button id="submit" type="primary"  @click="save('formInline')">提交</Button>
                <Button id="save"  @click="handleSubmit()" >保存到草稿</Button>
            </div>
            <div class="addres-container">
                <Tabs>
                    <Tab-pane label="开发环境" name="develop"><div class="allcontent">
                        <div class="title"><span>部署单元信息:</span></div>
                        <div class="container clearfix">
                            <div class="container-left">
                                <div><span>资源名称：</span> <Input style="width: 180px" v-model="formInline.resource_name"  ></Input></div>

                            </div>
                            <div class="container-right">
                                <div>
                                    <span>所属部署单元：</span>

                                    <Select style="width: 180px;"  v-model="formInline.project" :placeholder="project_list.length? '请选择' : '空'">
                                        <Option v-for="key in project_list" :value="key.item_name">{{key.item_name}}</Option>
                                    </Select>
                                </div>

                            </div>
                        </div>
                        <div class="title"><span>域名:</span></div>
                        <div class="container">
                            <div><span>自定义域名：</span> <Input style="width: 180px" v-model="formInline.domain"></Input>.syswin.com</div>
                        </div>

                        <div class="title"><span>计算信息:</span></div>
                        <div class="container">
                            <div class="clearfix" style="margin-bottom: 10px">
                                <div class="container-left">
                                    <span>实例名称:</span>
                                    <Input style="width: 180px" v-model="formInline.compute_list.ins_name"></Input>
                                </div>
                                <div class="container-right">
                                    <span>实例规格：</span>
                                    <Select style="width: 180px" v-model="formInline.compute_list.cpu" @on-change="changeArr1">
                                        <Option value="2C,4G">2C 4G</Option>
                                        <Option value="4C,8G">4C 8G</Option>
                                    </Select>
                                </div>
                            </div>
                            <div style="padding-top: 20px " class="clearfix">
                                <span>镜像：</span>
                                <Input style="width: 380px" v-model="formInline.compute_list.url"></Input>
                            </div>


                        </div>

                        <div class="title"><span>数据库信息:</span></div>
                        <div class="container database">
                            <Tabs>
                                <Tab-pane label="MYSQL" name="mysql">
                                    <div class="container-left" style="height: 100px">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="formInline.resource_list[0].res_name"></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="formInline.resource_list[0].quantity"></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="formInline.resource_list[0].disk"></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"  @change="changeArr2" v-model="formInline.resource_list[0].cpu">
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="formInline.resource_list[0].version">
                                                <Option value="MYSQL5.5">MYSQL5.5</Option>
                                                <Option value="MYSQL5.6">MYSQL5.6</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                                <Tab-pane label="REDIS" name="redis">
                                    <div class="container-left">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="formInline.resource_list[1].res_name"></Input>
                                        </div>
                                        <div>
                                            <span>实例版本：</span>
                                            <Select style="width: 180px" v-model="formInline.resource_list[1].version">
                                                <Option value="Redis2.8">Redis2.8</Option>
                                                <Option value="Redis3.0">Redis3.0</Option>
                                            </Select>
                                        </div>

                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px;height:50px"  v-model="formInline.resource_list[1].cpu" @change="changeArr3">
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="2C,8G">2C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例数量: </span>
                                            <Select style="width: 180px">

                                                <Input-number v-model="formInline.resource_list[1].quantity"></Input-number>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                                <Tab-pane label="MONGODB" name="mongo">
                                    <div class="container-left" style="height:100px;">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="formInline.resource_list[2].res_name"></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="formInline.resource_list[2].quantity" ></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="formInline.resource_list[2].disk"></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"  v-model="formInline.resource_list[2].cpu" @change="changeArr4">
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="formInline.resource_list[2].version">
                                                <option value="Mongo3.2">Mongo3.2</option>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                            </Tabs>


                        </div>
                    </div></Tab-pane>

                </Tabs>


            </div>
        </Form>
    </div>
</template>
<style scoped>

    .addres-wrap {
        width: 100%;
        padding: 10px 30px;
        border-top: 1px dashed #ccc;
    }

    .addres-top Button {
        float: right;
        background-color: #39f;
        color: white;
        margin: 0 4px;
    }

    .addres-container Button{
        border-radius: 10px;
        margin-right: 15px;
    }


    .title {
        width: 100%;
        height: 24px;
        line-height: 24px;
        background-color: #f2f2f2;
        margin-bottom: 10px;
    }

    .title span {
        color: #000;
        font-weight: 500;
        font-size: 18px;
    }

    .container {
        width: 100%;
        margin-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }



    .container-left,.container-right {
        height: auto;
        float: left;
    }

    .container-right {
        float: right;
        margin-right: 180px;

    }



    .database {
        border: 1px solid #d7d7d7;
    }



</style>
<script>
    import common from '../../../../tools/common.js';
    import {userinfo} from '../../../../tools/user.js';
    export default {
        data () {
        return {
            formInline: {
                resource_name: "",
                project: "",
                department: "syswin",
                user_name: userinfo.username,
                user_id: userinfo.user_id,
                domain: "",
                env: "develop",
                application_status: "待提交",
                approval_status:"流程不存在",
                resource_list: [
                    {
                        res_name: "",
                        res_type: "mysql",
                        cpu: 0,
                        mem: 0,
                        disk: 0,
                        quantity: 0,
                        version: ""
                    },
                    {
                        res_name: "",
                        res_type: "mongo",
                        cpu: 0,
                        mem: 0,
                        disk: 0,
                        quantity: 0,
                        version: ""
                    } ,
                    {
                        res_name: "",
                        res_type: "redis",
                        cpu: 0,
                        mem: 0,
                        disk: 0,
                        quantity: 0,
                        version: ""
                    }
                ],
                compute_list: [
                    {
                        ins_name: "",
                        cpu: 0,
                        mem: 0,
                        url: "0"
                    }
                ]
            },
            //部署单元名称列表
            project_list: [],
            ruleInline: {
                resource_name: [
                    { required: true, message: '请填资源名称', trigger: 'blur' }
                ]
            }
        }
    },
    beforeCreate(){
        //取得资源申请列表数据

        console.log(this.$route.query.id);
        if(this.$route.query.id){

            const url=common.apihost+'resource/'+this.$route.query.id;
            this.$http.get(url,{emulateJSON: true}).then(function (response) {
                console.log("response:"+response);

                if(response.body.code===200 && response.body.result.res=="success") {
                    console.log("res_id"+ response.body.result.msg.res_id);
                    this.formInline= response.body.result.msg;
                    this.formInline.res_id=response.body.result.msg.res_id;
                }
                // 成功回调
            });
        }

    },
    mounted() {
        this.getProjectList()
    },
    methods: {
        //保存到草稿箱
        handleSubmit() {
            let self=this;
            let newjson=JSON.stringify(self.formInline);
            const url=common.apihost+'resource/';
            self.$router.push({name: 'res_applicationHistory'});
            this.$http.post(url,newjson, {emulateJSON:true}  ).then(function (response) {

                console.log(response);
                if(response.body.code===200 && response.body.result.res=="success") {
                    this.$Message.success('提交成功!');

                    self.$router.push({name: 'res_applicationHistory'});
                }
                // 成功回调
            }, function () {
                /*this.$Message.error('登陆失败!');*/
                // 失败回调
            });

        },
        //提交
        save(name) {

            let self=this;
            self.formInline.application_status="已提交";
            let newjson=JSON.stringify(self.formInline);
            const url=common.apihost+'resource/';

            //判断是否是第一次提交第一次用post，第二次用put
           if(self.formInline.res_id){
               let newUrl=url+self.formInline.res_id+"/";

               this.$http.put(newUrl,newjson ).then(function (response) {

                   console.log(response);
                   if(response.body.code===200 && response.body.result.res=="success") {
                       this.$Message.success('提交成功!');
                       //添加一条审批
                       this.addCheck();
                      // self.$router.push({name: 'res_applicationHistory'});
                   }
                   // 成功回调
               }, function () {
                   /*this.$Message.error('登陆失败!');*/
                   // 失败回调
               });
           }else{
               this.$http.post(url,newjson, {emulateJSON:true}  ).then(function (response) {

                   console.log(response);
                   if(response.body.code===200 && response.body.result.res=="success") {
                       this.$Message.success('提交成功!');
                       this.formInline.res_id= response.body.result.res_id;
                       //添加一条审批
                       this.addCheck();
                   }
                   // 成功回调
               }, function () {

               });
           }



    },
    argToString(arg){
        return(arg.split(","));
    },
        //添加审批
    addCheck(){
            const url=common.apihost+'approval/approvals';
            let checkJson={
                resource_id:this.formInline.res_id,
                  project_id:this.formInline.project,
                department_id:userinfo.user_id,
                creator_id:userinfo.department
            };
            console.log("tianjiashenpi"+checkJson);
            this.$http.post(url,checkJson, {emulateJSON:true}  ).then(function (response) {

                console.log(response);
                if(response.body.code===200 ) {

                    this.$router.push({name: 'res_applicationHistory'});
                }
                // 成功回调
            }, function () {

            });
    },
      //取得所属部门信息
   getProjectList() {
           // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
           // console.log(userInfo)
            let url = common.apihost + 'iteminfo/iteminfoes/local/' + userinfo.username
            this.$http.get(url).then(data => {
                console.log('ProjectList', data)
            this.project_list = data.body.result.res
        }, err => {
            console.log('error', err)
        })
    },
    changeArr1(arr){
        console.log(arr);
        let cupands=this.argToString(arr);
        this.formInline.compute_list.cpu=cupands[0];
        this.formInline.compute_list.mem=cupands[1];
    },
    changeArr2(arr){
        let mysqlcpus=this.argToString(arr);
        this.formInline.resource_list[0].cpu=mysqlcpus[0];
        this.formInline.resource_list[0].mem=mysqlcpus[1];
    },
    changeArr3(arr){
        let rediscpus=this.argToString(arr);
        this.formInline.resource_list[1].cpu=rediscpus[0];
        this.formInline.resource_list[1].mem=rediscpus[1];
    },
        changeArr4(arr){
        let mongocpus=this.argToString(arr);
        this.formInline.resource_list[2].cpu=mongocpus[0];
        this.formInline.resource_list[2].mem=mongocpus[1];
    }
    }
    }




</script>