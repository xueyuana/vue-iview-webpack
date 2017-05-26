<!--资源审批-->
<template>
    <div class="addres-wrap">
        <Form ref="jsonname" :model="jsonname">
            <div class="addres-top clearfix">
                <Button id="submit" type="primary"  @click="pass()">通过</Button>
                <Button id="save"  @click="notPass()" >不通过</Button>
            </div>
            <div class="addres-container">
                <Tabs>
                    <Tab-pane label="开发环境" name="develop"><div class="allcontent">
                        <div class="title"><span>部署单元信息:</span></div>
                        <div class="container clearfix">
                            <div class="container-left">
                                <div><span>资源名称：</span> <Input style="width: 180px" v-model="jsonname.resource_name"  disabled ></Input></div>

                            </div>
                            <div class="container-right">
                                <div>
                                    <span>所属部署单元：</span>
                                    <Select style="width: 180px" v-model="jsonname.project"  disabled>
                                        <Option value="" ></Option>
                                    </Select>
                                </div>

                            </div>
                        </div>
                        <div class="title"><span>域名:</span></div>
                        <div class="container">
                            <div><span>自定义域名：</span> <Input style="width: 180px" v-model="jsonname.domain" disabled></Input></div>
                        </div>

                        <div class="title"><span>计算信息:</span></div>
                        <div class="container">
                            <div class="clearfix" style="margin-bottom: 10px">
                                <div class="container-left">
                                    <span>实例名称:</span>
                                    <Input style="width: 180px" v-model="jsonname.compute_list[0].ins_name" disabled></Input>
                                 </div>
                                <div class="container-right">
                                    <span>实例规格：</span>
                                    <Select style="width: 180px" v-model="cpuandrem.cpuandrem1"  disabled>
                                        <Option value="2C,4G">2C 4G</Option>
                                        <Option value="4C,8G">4C 8G</Option>
                                    </Select>
                                </div>
                            </div>
                                <div style="padding-top: 20px " class="clearfix">
                                    <span>镜像：</span>
                                    <Input style="width: 380px" v-model="jsonname.compute_list[0].url" disabled></Input>
                                </div>


                        </div>

                        <div class="title"><span>数据库信息:</span></div>
                        <div class="container database">
                            <Tabs>
                                <Tab-pane label="MYSQL" name="mysql">
                                    <div class="container-left" style="height: 100px">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="jsonname.resource_list[0].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="jsonname.resource_list[0].quantity" disabled></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="jsonname.resource_list[0].disk" disabled></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"   v-model="cpuandrem.resourcecr1" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[0].version" disabled>
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
                                            <Input style="width: 180px" v-model="jsonname.resource_list[1].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例版本：</span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[1].version" disabled>
                                                <Option value="Redis2.8">Redis2.8</Option>
                                                <Option value="Redis3.0">Redis3.0</Option>
                                            </Select>
                                        </div>

                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px;height:50px"  v-model="cpuandrem.resourcecr2" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="2C,8G">2C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例数量: </span>
                                            <Input-number v-model="jsonname.resource_list[1].quantity" disabled></Input-number>
                                        </div>
                                    </div>
                                </Tab-pane>
                                <Tab-pane label="MONGODB" name="mongo">
                                    <div class="container-left" style="height:100px;">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="jsonname.resource_list[2].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="jsonname.resource_list[2].quantity" disabled></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="jsonname.resource_list[2].disk" disabled></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"  v-model="cpuandrem.resourcecr3" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[2].version" disabled>
                                                <option value="Mongo3.2">Mongo3.2</option>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                            </Tabs>


                        </div>
                        <div class="title"><span>审批意见:</span></div>
                        <div ><textarea style="width: 100%" id="annotation" v-model="checkjson.annotation" ></textarea></div>
                    </div></Tab-pane>
                    <Tab-pane label="测试环境" name="test"><div class="allcontent">
                        <div class="title"><span>部署单元信息:</span></div>
                        <div class="container clearfix">
                            <div class="container-left">
                                <div><span>资源名称：</span> <Input style="width: 180px" v-model="jsonname.resource_name"  disabled ></Input></div>

                            </div>
                            <div class="container-right">
                                <div>
                                    <span>所属部署单元：</span>
                                    <Select style="width: 180px" v-model="jsonname.project" disabled>
                                        <Option value="应用统筹部"></Option>
                                    </Select>
                                </div>

                            </div>
                        </div>
                        <div class="title"><span>域名:</span></div>
                        <div class="container">
                            <div><span>自定义域名：</span> <Input style="width: 180px" v-model="jsonname.domain" disabled></Input>.syswin.com</div>
                        </div>

                        <div class="title"><span>计算信息:</span></div>
                        <div class="container">
                            <div class="clearfix" style="margin-bottom: 10px">
                                <div class="container-left">
                                    <span>实例名称:</span>
                                    <Input style="width: 180px" v-model="jsonname.compute_list.ins_name" disabled></Input>
                                </div>
                                <div class="container-right">
                                    <span>实例规格：</span>
                                    <Select style="width: 180px" v-model="jsonname.compute_list.cpu"  disabled>
                                        <Option value="2C,4G">2C 4G</Option>
                                        <Option value="4C,8G">4C 8G</Option>
                                    </Select>
                                </div>
                            </div>
                            <div style="padding-top: 20px " class="clearfix">
                                <span>镜像：</span>
                                <Input style="width: 380px" v-model="jsonname.compute_list.url" disabled></Input>
                            </div>


                        </div>

                        <div class="title"><span>数据库信息:</span></div>
                        <div class="container database">
                            <Tabs>
                                <Tab-pane label="MYSQL" name="mysql">
                                    <div class="container-left" style="height: 100px">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="jsonname.resource_list[0].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="jsonname.resource_list[0].quantity" disabled></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="jsonname.resource_list[0].disk" disabled></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"   v-model="jsonname.resource_list[0].cpu" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[0].version" disabled>
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
                                            <Input style="width: 180px" v-model="jsonname.resource_list[1].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例版本：</span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[1].version" disabled>
                                                <Option value="Redis2.8">Redis2.8</Option>
                                                <Option value="Redis3.0">Redis3.0</Option>
                                            </Select>
                                        </div>

                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px;height:50px"  v-model="jsonname.resource_list[1].cpu" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="2C,8G">2C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例数量: </span>
                                            <Select style="width: 180px">

                                                <Input-number v-model="jsonname.resource_list[1].quantity" disabled></Input-number>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                                <Tab-pane label="MONGODB" name="mongo">
                                    <div class="container-left" style="height:100px;">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="jsonname.resource_list[2].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="jsonname.resource_list[2].quantity" disabled></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="jsonname.resource_list[2].disk" disabled></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"  v-model="jsonname.resource_list[2].cpu" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[2].version" disabled>
                                                <option value="Mongo3.2">Mongo3.2</option>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                            </Tabs>


                        </div>
                        <div class="title"><span>审批意见:</span></div>
                        <div ><textarea style="width: 100%" id="annotation" v-model="checkjson.annotation" ></textarea></div>
                    </div></Tab-pane>
                    <Tab-pane label="生产环境" name="product"><div class="allcontent">
                        <div class="title"><span>部署单元信息:</span></div>
                        <div class="container clearfix">
                            <div class="container-left">
                                <div><span>资源名称：</span> <Input style="width: 180px" v-model="jsonname.resource_name"  disabled ></Input></div>

                            </div>
                            <div class="container-right">
                                <div>
                                    <span>所属部署单元：</span>
                                    <Select style="width: 180px" v-model="jsonname.project" disabled>
                                        <Option value="应用统筹部"></Option>
                                    </Select>
                                </div>

                            </div>
                        </div>
                        <div class="title"><span>域名:</span></div>
                        <div class="container">
                            <div><span>自定义域名：</span> <Input style="width: 180px" v-model="jsonname.domain" disabled></Input>.syswin.com</div>
                        </div>

                        <div class="title"><span>计算信息:</span></div>
                        <div class="container">
                            <div class="clearfix" style="margin-bottom: 10px">
                                <div class="container-left">
                                    <span>实例名称:</span>
                                    <Input style="width: 180px" v-model="jsonname.compute_list[0].ins_name" disabled></Input>
                                </div>
                                <div class="container-right">
                                    <span>实例规格：</span>
                                    <Select style="width: 180px" v-model="jsonname.compute_list.cpu"  disabled>
                                        <Option value="2C,4G">2C 4G</Option>
                                        <Option value="4C,8G">4C 8G</Option>
                                    </Select>
                                </div>
                            </div>
                            <div style="padding-top: 20px " class="clearfix">
                                <span>镜像：</span>
                                <Input style="width: 380px" v-model="jsonname.compute_list[0].url" disabled></Input>
                            </div>


                        </div>

                        <div class="title"><span>数据库信息:</span></div>
                        <div class="container database">
                            <Tabs>
                                <Tab-pane label="MYSQL" name="mysql">
                                    <div class="container-left" style="height: 100px">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="jsonname.resource_list[0].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="jsonname.resource_list[0].quantity" disabled></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="jsonname.resource_list[0].disk" disabled></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"   v-model="jsonname.resource_list[0].cpu" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[0].version" disabled>
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
                                            <Input style="width: 180px" v-model="jsonname.resource_list[1].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例版本：</span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[1].version" disabled>
                                                <Option value="Redis2.8">Redis2.8</Option>
                                                <Option value="Redis3.0">Redis3.0</Option>
                                            </Select>
                                        </div>

                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px;height:50px"  v-model="jsonname.resource_list[1].cpu" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="2C,8G">2C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例数量: </span>
                                            <Select style="width: 180px">

                                                <Input-number v-model="jsonname.resource_list[1].quantity" disabled></Input-number>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                                <Tab-pane label="MONGODB" name="mongo">
                                    <div class="container-left" style="height:100px;">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="jsonname.resource_list[2].res_name" disabled></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="jsonname.resource_list[2].quantity" disabled></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="jsonname.resource_list[2].disk" disabled></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px"  v-model="jsonname.resource_list[2].cpu" disabled>
                                                <Option value="2C,4G">2C 4G</Option>
                                                <Option value="4C,8G">4C 8G</Option>
                                                <Option value="4C,16G">4C 16G</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="jsonname.resource_list[2].version" disabled>
                                                <option value="Mongo3.2">Mongo3.2</option>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                            </Tabs>


                        </div>
                        <div class="title"><span>审批意见:</span></div>
                        <div ><textarea style="width: 100%" id="annotation" v-model="checkjson.annotation" ></textarea></div>
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
    import {setStroage, getStroage} from 'tools/cookieAction.js'
    export default {
        data () {
        return {
            jsonname: {
                resource_name: "qq",
                project: "项目名称aaa",
                project_id:"",
                department: "syswin",
                user_name: getStroage('userInfo').username,
                user_id: getStroage('userInfo').user_id,
                domain: "",
                env: "develop",
                application_status: "待提交",
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
            cpuandrem:{
                'cpuandrem1':'0C,0G',
                'resourcecr1':'0C,0G',
                'resourcecr2':'0C,0G',
                'resourcecr3':'0C,0G'
            },
            //部署单元名称列表
            project_list: [],
            checkjson:{"approve_uid":getStroage('userInfo').user_id,"agree":true,"annotation":""}

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
                this.jsonname= response.body.result.msg
                   this. arrToString();
               }
               // 成功回调
           });
       }

    },
        methods: {
        arrToString(){
            this.cpuandrem.cpuandrem1= this.jsonname.compute_list[0].cpu+"C,"+ this.jsonname.compute_list[0].mem+"G";
            this.cpuandrem.resourcecr1= this.jsonname.resource_list[0].cpu+"C,"+ this.jsonname.resource_list[0].mem+"G"
            this.cpuandrem.resourcecr2= this.jsonname.resource_list[1].cpu+"C,"+ this.jsonname.resource_list[1].mem+"G"
            this.cpuandrem.resourcecr3= this.jsonname.resource_list[2].cpu+"C,"+ this.jsonname.resource_list[2].mem+"G"
        },
        pass() {
            let self=this;
            self.checkjson.agree=true;
            const url=common.apihost+'approval/approvals/'+this.$route.query.id;
            this.$http.put(url,self.checkjson).then(function (response) {
                if(response.body.code===200) {
                   //
                    console.log("审批通过");
//                    this.$router.push({name: 'res_applicationHistory'});
                    const url2=common.apihost+'approval/reservation/';
                    let json2={
                        "resource_id":this.$route.query.id
                    };
                    this.$http.post(url2,json2, {emulateJSON:true}).then(function (response) {
                        if(response.body.code===200) {
                            console.log("资源预留通过");
                            if(this.$store.state.path.originPath==="/res_application_history") { //从资源申请历史页面进入
                             this.$router.push({name: 'res_applicationHistory'});

                             }else if(this.$store.state.path.originPath==="/admin_console"){  // 从管理员控制台进入
                             this.$router.push({name: 'adminConsole'});
                             }
                        }
                    });


                }
                // 成功回调
            });
        },
        notPass() {
            let self=this;
            self.checkjson.agree=false;
            console.log("审批:"+ self.checkjson);
            const url=common.apihost+'approval/approvals/'+this.$route.query.id;
            this.$http.put(url,self.checkjson).then(function (response) {

                if(response.body.code===200) {
                  //  this.jsonname.application_status="审批不通过";
                    console.log("审批不通过");
//                    this.$router.push({name: 'res_applicationHistory'});

                    if(this.$store.state.path.originPath==="/res_application_history") { //从资源申请历史页面进入
                        this.$router.push({name: 'res_applicationHistory'});

                    }else if(this.$store.state.path.originPath==="/admin_console"){  // 从管理员控制台进入
                        this.$router.push({name: 'adminConsole'});
                    }
                }
                // 成功回调
            });
        }

    }

    }




</script>